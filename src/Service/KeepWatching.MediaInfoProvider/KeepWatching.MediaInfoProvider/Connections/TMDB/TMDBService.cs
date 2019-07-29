using KeepWatching.MediaInfoProvider.Configuration;
using KeepWatching.MediaInfoProvider.Connections.Common;
using KeepWatching.MediaInfoProvider.Connections.Interfaces;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Connections.TMDB
{
    public class TMDBService : AbstractHttpRequestExecutor, IHttpRequestHandler
    {
        // TODO logger's T
        public TMDBService(HttpClient client, IConfiguration configuration, IOptions<TMDBAPISettings> options, ILogger<AbstractHttpRequestExecutor> logger) : base(client, logger)
        {
            _configuration = configuration;
            _TMDBSettings = options.Value;

            UriBuilder uriBuilder = new UriBuilder(_TMDBSettings.Scheme, _TMDBSettings.Host);
            client.BaseAddress = uriBuilder.Uri;
        }

        public async Task<HttpResponseMessage> Fetch(string requestPath, IDictionary<string, string> queryParameters)
        {
            QueryBuilder queryBuilder = new QueryBuilder(queryParameters);

            return await Fetch(requestPath, queryBuilder);
        }

        public async Task<HttpResponseMessage> Fetch(string requestPath, params (string key, string value)[] queryParameters)
        {
            QueryBuilder queryBuilder = new QueryBuilder(queryParameters.Select(x => KeyValuePair.Create(x.key, x.value)));

            return await Fetch(requestPath, queryBuilder);
        }

        private async Task<HttpResponseMessage> Fetch(string requestPath, QueryBuilder queryBuilder)
        {
            queryBuilder.Add("api_key", _configuration["TMDB:APIKey"]);

            string query = queryBuilder.ToQueryString().ToUriComponent();

            string requestUri = $"{_TMDBSettings.Version}/{requestPath}{query}";

            return await ExecuteHttpRequest(client => client.GetAsync(requestUri));
        }

        private readonly IConfiguration _configuration;
        private readonly TMDBAPISettings _TMDBSettings;
    }
}
