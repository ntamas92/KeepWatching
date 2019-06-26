using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Connections.Interfaces;
using KeepWatching.MediaInfoProvider.Connections.TMDB;
using KeepWatching.MediaInfoProvider.Model;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace KeepWatching.MediaInfoProvider.Repositories
{
    public class TMDBMediaRepository : IMediaRepository
    {
        public TMDBMediaRepository(IHttpRequestHandler httpRequestHandler)
        {
            _httpRequestHandler = httpRequestHandler;
        }

        public async Task<IEnumerable<AbstractMedia>> GetMediasByTitle(string title, int page = 1)
        {
            var queryParameters = new Dictionary<string, string>
            {
                [TMDBConstants.Page] = page.ToString(),
                [TMDBConstants.Query] = title,
            };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var stringResult = await result.Content.ReadAsStringAsync();

            // TODO use json parsing strategy to handle DTO mapping
            IEnumerable<AbstractMedia> movies = JObject.Parse(stringResult)
                    .GetValue("results")
                    .Children()
                    .Select(x => x.Value<string>("title"))
                    .Select(x => new Movie() { Title = x });

            return movies;
        }

        private readonly IHttpRequestHandler _httpRequestHandler;
    }
}
