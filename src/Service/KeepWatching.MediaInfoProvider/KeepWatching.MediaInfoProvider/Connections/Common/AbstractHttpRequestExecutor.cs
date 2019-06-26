using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Connections.Common
{
    public class AbstractHttpRequestExecutor
    {
        public AbstractHttpRequestExecutor(HttpClient client, ILogger<AbstractHttpRequestExecutor> logger)
        {
            Client = client;
            Logger = logger;
        }

        protected HttpClient Client { get; }

        protected ILogger Logger { get; }

        protected async Task<HttpResponseMessage> ExecuteHttpRequest(Func<HttpClient, Task<HttpResponseMessage>> clientCall)
        {
            try
            {
                var response = await clientCall.Invoke(Client);

                response.EnsureSuccessStatusCode();

                return response;
            }
            catch (HttpRequestException e)
            {
                Logger.LogWarning(e, "Unsuccessful HTTP request.");

                // TODO use retry logic, differentiate between http errors, and use status codes accordingly
                return new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
            }
        }
    }
}
