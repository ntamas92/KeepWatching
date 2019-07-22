using KeepWatching.MediaInfoProvider.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Repositories.TMDB
{
    public class TMDBConverter : JsonConverter
    {
        private readonly JsonSerializerSettings _serializerSettings;

        public TMDBConverter(JsonSerializerSettings serializerSettings = null)
        {
            _serializerSettings = serializerSettings ?? new JsonSerializerSettings();
        }


        public override bool CanConvert(Type objectType)
        {
            return typeof(Entity).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JToken jObject = JToken.ReadFrom(reader);
            string type = jObject["media_type"].ToString();

            switch (type)
            {
                case "movie":
                    _serializerSettings.ContractResolver = new MovieContractResolver()
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    };
                    return jObject.ToObject(objectType, JsonSerializer.Create(_serializerSettings));
                case "tv":
                    _serializerSettings.ContractResolver = new TvContractResolver()
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    };
                    return jObject.ToObject(objectType, JsonSerializer.Create(_serializerSettings));
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
