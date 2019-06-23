using KeepWatching.MediaInfoProvider.Configuration;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Connections.TMDB
{
    public class TMDBService
    {
        private readonly IConfiguration _configuration;
        private readonly TMDBAPISettings _TMDBSettings;

        public HttpClient Client { get; }

        public TMDBService(HttpClient client, IConfiguration configuration, IOptions<TMDBAPISettings> options)
        {
            _configuration = configuration;
            _TMDBSettings = options.Value;
            UriBuilder uriBuilder = new UriBuilder(_TMDBSettings.Scheme, _TMDBSettings.Host);

            client.BaseAddress = uriBuilder.Uri;

            Client = client;
        }

        public async Task<HttpResponseMessage> GetMultiSearchResult(string title, int page = 1)
        {
            // TODO encapsulate query building and response handling
            // TODO get APIKey from IOptions?

            QueryBuilder queryBuilder = new QueryBuilder
            {
                { "api_key", _configuration["TMDB:APIKey"] },
                { "query", title },
                { "page", page.ToString() }
            };

            string requestUri = $"{_TMDBSettings.Version}/{TMDBConstants.MultiSearchPath}{queryBuilder.ToQueryString().ToUriComponent()}";

            var response = await Client.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();

            return response;
        }
    }
}
