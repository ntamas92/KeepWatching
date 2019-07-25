using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Connections.Interfaces;
using KeepWatching.MediaInfoProvider.Connections.TMDB;
using KeepWatching.MediaInfoProvider.Model;
using KeepWatching.MediaInfoProvider.Repositories.TMDB;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace KeepWatching.MediaInfoProvider.Repositories
{
    public class TMDBMediaRepository : IMediaRepository
    {
        private readonly IHttpRequestHandler _httpRequestHandler;
        private readonly JsonSerializer _serializer;

        public TMDBMediaRepository(IHttpRequestHandler httpRequestHandler)
        {
            _httpRequestHandler = httpRequestHandler;

            _serializer = new JsonSerializer { ContractResolver = new DefaultContractResolver() { NamingStrategy = new SnakeCaseNamingStrategy() } };
            _serializer.Converters.Add(new TMDBConverter<Suggestion>());
            _serializer.Converters.Add(new TMDBConverter<AbstractMedia>());
        }

        public async Task<PagedResult<AbstractMedia>> GetMediasByTitle(string title, int page = 1)
        {
            var queryParameters = new Dictionary<string, string>
            {
                [TMDBConstants.Page] = page.ToString(),
                [TMDBConstants.Query] = title,
            };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var streamResult = await result.Content.ReadAsStreamAsync();

            using (StreamReader sr = new StreamReader(streamResult))
            using (JsonTextReader tr = new JsonTextReader(sr))
            {
                var pagedResult = _serializer.Deserialize<PagedResult<AbstractMedia>>(tr);
                pagedResult.Results = pagedResult.Results
                                                 .Where(x => x != null)
                                                 .Select(x => { x.PosterPath = x.PosterPath != null ? $"https://image.tmdb.org/t/p/w92/{x.PosterPath}" : null; return x; }); //TODO: eliminate
                return pagedResult;
            }
        }

        public async Task<IEnumerable<Suggestion>> GetSuggestionsAsync(string title)
        {
            var queryParameters = new Dictionary<string, string> { [TMDBConstants.Query] = title, };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var stringResult = await result.Content.ReadAsStringAsync();

            var jsonForm = JObject.Parse(stringResult);

            var objects = jsonForm.GetValue("results")
                                  .ToObject<IEnumerable<Suggestion>>(_serializer)
                                  .Where(x =>x != null)
                                  .Select(x => { x.PosterPath = x.PosterPath != null ? $"https://image.tmdb.org/t/p/w92/{x.PosterPath}" : null; return x; });

            return objects;
        }
    }
}
