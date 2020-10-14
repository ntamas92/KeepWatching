using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Model
{
    public class PagedResult<T> where T : Entity
    {
        public int Page { get; set; }

        public int TotalResults { get; set; }

        public int TotalPages { get; set; }

        public IEnumerable<T> Results { get; set; }
    }
}
