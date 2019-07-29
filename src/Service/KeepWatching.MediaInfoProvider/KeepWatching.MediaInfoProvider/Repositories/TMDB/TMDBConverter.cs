using KeepWatching.MediaInfoProvider.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;

namespace KeepWatching.MediaInfoProvider.Repositories.TMDB
{
    public class TMDBConverter<T> : JsonConverter
    {
        public TMDBConverter(Func<JToken, MediaType> mediaTypeSelector)
        {
             _mediaTypeSelector = mediaTypeSelector;

            var namingStrategy = new SnakeCaseNamingStrategy();

            _movieContractResolver = new PropertyMapBasedContractResolver(_moviePropertyMappings) { NamingStrategy = namingStrategy };
            _tvContractResolver = new PropertyMapBasedContractResolver(_tvPropertyMappings) { NamingStrategy = namingStrategy };

        }

        public override bool CanConvert(Type objectType)
        {
            return typeof(T) == objectType;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            IContractResolver contractResolverBefore = serializer.ContractResolver;
            IContractResolver contractResolver;

            object objectToDeserializeOnto = null;

            if (objectType.GetConstructor(Type.EmptyTypes) != null && !objectType.IsAbstract)
            {
                objectToDeserializeOnto = Activator.CreateInstance(objectType);
            }

            JToken jObject = JToken.ReadFrom(reader);

            MediaType mediaType = _mediaTypeSelector(jObject);

            switch (mediaType)
            {
                case MediaType.Movie:
                    contractResolver = _movieContractResolver;
                    objectToDeserializeOnto ??= new Movie(); //Wow...
                    break;
                case MediaType.Tv:
                    contractResolver = _tvContractResolver;
                    objectToDeserializeOnto ??= new TVShow();
                    break;
                default:
                    return null;
            }

            serializer.ContractResolver = contractResolver ?? contractResolverBefore;

            //TODO: How does reader creation affect performance?
            serializer.Populate(jObject.CreateReader(), objectToDeserializeOnto);
            serializer.ContractResolver = contractResolverBefore;
            return objectToDeserializeOnto;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }


        private IDictionary<string, string> _moviePropertyMappings = new Dictionary<string, string>()
        {
            [nameof(Suggestion.Type)] = "media_type",
            [nameof(Suggestion.Released)] = "release_date",
            [nameof(AbstractMedia.Length)] = "runtime",
            [nameof(AbstractMedia.Plot)] = "overview",
        };

        private Dictionary<string, string> _tvPropertyMappings = new Dictionary<string, string>()
        {
            [nameof(Suggestion.Type)] = "media_type",
            [nameof(Suggestion.Released)] = "first_air_date",
            [nameof(Suggestion.Title)] = "name"
        };

        private PropertyMapBasedContractResolver _movieContractResolver;
        private PropertyMapBasedContractResolver _tvContractResolver;
        private Func<JToken, MediaType> _mediaTypeSelector;
    }
}
