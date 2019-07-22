using KeepWatching.MediaInfoProvider.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Repositories.TMDB
{
    public class TvContractResolver : DefaultContractResolver
    {
        private Dictionary<string, string> _propertyMappings = new Dictionary<string, string>()
        {
            [nameof(Suggestion.Type)] = "media_type",
            [nameof(Suggestion.Released)] = "first_air_date",
            [nameof(Suggestion.Title)] = "name"
        };

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);

            if (_propertyMappings.TryGetValue(member.Name, out string mappedValue))
                property.PropertyName = mappedValue;

            return property;
        }

    }
}
