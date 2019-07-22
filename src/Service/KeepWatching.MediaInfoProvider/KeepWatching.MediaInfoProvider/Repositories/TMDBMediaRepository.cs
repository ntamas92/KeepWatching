using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Connections.Interfaces;
using KeepWatching.MediaInfoProvider.Connections.TMDB;
using KeepWatching.MediaInfoProvider.Model;
using KeepWatching.MediaInfoProvider.Repositories.TMDB;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

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

            var serializer = new JsonSerializer();
            serializer.Converters.Add(new TMDBConverter());

            // TODO use json parsing strategy to handle DTO mapping
            IEnumerable<AbstractMedia> movies = jsonForm
                .GetValue("results")
                .ToObject<IEnumerable<Movie>>(serializer);

            var pagedResult = ExtractPagingData<AbstractMedia>(jsonForm);

            pagedResult.PageContent = movies;

            return pagedResult;
        }

        public async Task<IEnumerable<Suggestion>> GetSuggestionsAsync(string title)
        {
            var queryParameters = new Dictionary<string, string>
            {
                [TMDBConstants.Page] = 1.ToString(), //TODO: Can we eliminate this from here?
                [TMDBConstants.Query] = title,
            };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var stringResult = await result.Content.ReadAsStringAsync();

            var jsonForm = JObject.Parse(stringResult);

            JsonSerializer serializer = new JsonSerializer();
            serializer.Converters.Add(new TMDBConverter());
            
            var objects = jsonForm.GetValue("results").ToObject<IEnumerable<Suggestion>>(serializer);

            return objects;
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
