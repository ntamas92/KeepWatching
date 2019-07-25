using KeepWatching.MediaInfoProvider.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace KeepWatching.MediaInfoProvider.Repositories.TMDB
{
    public class PropertyMapBasedContractResolver : DefaultContractResolver
    {
        private Dictionary<string, string> _propertyMappings;

        //TODO: Consider refactoring into a ContractResolverDecorator.
        public PropertyMapBasedContractResolver(IDictionary<string, string> propertyMappings)
        {
            _propertyMappings = new Dictionary<string, string>(propertyMappings);
        }


        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);

            if (_propertyMappings.TryGetValue(member.Name, out string mappedValue))
                property.PropertyName = mappedValue;

            return property;
        }
    }
}
