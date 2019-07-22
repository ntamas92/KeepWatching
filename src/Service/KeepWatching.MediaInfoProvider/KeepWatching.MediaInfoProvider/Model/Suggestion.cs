using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Model
{
    public class Suggestion : Entity
    {
        public string Title { get; set; }

        public string Type { get; set; }

        public DateTime? Released { get; set; }

        public string PosterPath { get; set; }
    }
}
