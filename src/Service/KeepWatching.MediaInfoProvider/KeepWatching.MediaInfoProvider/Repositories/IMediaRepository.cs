using KeepWatching.MediaInfoProvider.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Repositories
{
    public interface IMediaRepository
    {
        Task<IEnumerable<AbstractMedia>> GetMediasByTitle(string title, int page = 1);
    }
}
