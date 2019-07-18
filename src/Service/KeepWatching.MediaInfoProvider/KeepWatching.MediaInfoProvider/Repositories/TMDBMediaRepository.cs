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

        public async Task<PagedResult<AbstractMedia>> GetMediasByTitle(string title, int page = 1)
        {
            var queryParameters = new Dictionary<string, string>
            {
                [TMDBConstants.Page] = page.ToString(),
                [TMDBConstants.Query] = title,
            };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var stringResult = await result.Content.ReadAsStringAsync();

            var jsonForm = JObject.Parse(stringResult);

            // TODO use json parsing strategy to handle DTO mapping
            IEnumerable<AbstractMedia> movies = jsonForm
                    .GetValue("results")
                    .Children()
                    .Select(x => new { title = x.Value<string>("title"), image = x.Value<string>("poster_path") })
                    .Where(x => !String.IsNullOrEmpty(x.image))
                    .Select(x => new Movie() { Title = x.title, PosterPath = $"https://image.tmdb.org/t/p/w92/{x.image}" });

            var pagedResult = ExtractPagingData<AbstractMedia>(jsonForm);

            pagedResult.PageContent = movies;

            return pagedResult;
        }

        private PagedResult<T> ExtractPagingData<T>(JObject jsonForm) where T : AbstractMedia
        {
            return new PagedResult<T>()
            {
                CurrentPage = jsonForm.Value<int>("page"),
                TotalPages = jsonForm.Value<int>("total_pages"),
                TotalResults = jsonForm.Value<int>("total_results")
            };
        }

        private readonly IHttpRequestHandler _httpRequestHandler;
    }

    
}
