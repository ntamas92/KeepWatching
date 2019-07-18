using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Model
{
    public class PagedResult<T> where T : Entity
    {
        public int CurrentPage { get; set; }

        public int TotalResults { get; set; }

        public int TotalPages { get; set; }

        public IEnumerable<T> PageContent { get; set; }
    }
}
