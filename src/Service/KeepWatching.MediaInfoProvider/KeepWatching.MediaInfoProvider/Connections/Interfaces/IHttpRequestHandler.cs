using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Connections.Interfaces
{
    public interface IHttpRequestHandler
    {
        Task<HttpResponseMessage> Fetch(string requestPath, IDictionary<string, string> queryParameters);
    }
}
