using System;
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
            _serializer.Converters.Add(new TMDBConverter<Movie>(_ => MediaType.Movie));
            _serializer.Converters.Add(new TMDBConverter<TVShow>(_ => MediaType.Tv));
            //_serializer.Converters.Add(new TMDBConverter<>(_ => MediaType.Person));

            _serializer.Converters.Add(new TMDBConverter<Suggestion>(GetMediaTypeFromJson));
            _serializer.Converters.Add(new TMDBConverter<AbstractMedia>(GetMediaTypeFromJson));
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

            var deserializedResponse = DeserializeResponse<PagedResult<AbstractMedia>>(streamResult);

            deserializedResponse.Results = deserializedResponse.Results
                                                 .Where(x => x != null)
                                                 .Select(x => { x.PosterPath = x.PosterPath != null ? $"https://image.tmdb.org/t/p/w92/{x.PosterPath}" : null; return x; }); //TODO: eliminate

            return deserializedResponse;
        }

        public async Task<IEnumerable<Suggestion>> GetSuggestionsAsync(string title)
        {
            var queryParameters = new Dictionary<string, string> { [TMDBConstants.Query] = title, };

            var result = await _httpRequestHandler.Fetch(TMDBConstants.MultiSearchPath, queryParameters);

            var streamResult = await result.Content.ReadAsStreamAsync();

            var deserializedResponse = DeserializeResponse<PagedResult<Suggestion>>(streamResult);

            deserializedResponse.Results = deserializedResponse.Results
                                                 .Where(x => x != null)
                                                 .Select(x => { x.PosterPath = x.PosterPath != null ? $"https://image.tmdb.org/t/p/w92/{x.PosterPath}" : null; return x; }); //TODO: eliminate

            return deserializedResponse.Results;
        }

        public async Task<T> GetMediaDetailsAsync<T>(string mediaId, MediaType mediaType)
        {
            //TODO: Extract details - mediaType mappings to a dedicated configuration
            string requestRoot = mediaType == MediaType.Movie ? TMDBConstants.MovieDetailsPath : TMDBConstants.TvDetailsPath;

            string requestPath = string.Join('/', requestRoot, mediaId);

            var response = await _httpRequestHandler.Fetch(requestPath);

            var responseStream = await response.Content.ReadAsStreamAsync();

            var result = DeserializeResponse<T>(responseStream);

            return result;

        }

        private T DeserializeResponse<T>(Stream responseStream)
        {
            using (StreamReader sr = new StreamReader(responseStream))
            using (JsonTextReader tr = new JsonTextReader(sr))
            {
                var pagedResult = _serializer.Deserialize<T>(tr);
                return pagedResult;
            }
        }

        private MediaType GetMediaTypeFromJson(JToken jToken)
        {
            string type = jToken["media_type"].ToString();

            if (type == "movie")
                return MediaType.Movie;
            if (type == "tv")
                return MediaType.Tv;
            if (type == "person")
                return MediaType.Person;

            throw new NotSupportedException();
        }
    }
}
