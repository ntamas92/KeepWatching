using KeepWatching.MediaInfoProvider.Model;
using KeepWatching.MediaInfoProvider.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepWatching.MediaInfoProvider.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private IMediaRepository _mediaRepository;

        public DetailsController(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        [HttpGet("movie/{movieId}")]
        public async Task<ActionResult<Movie>> GetMovieDetails(string movieId)
        {
            var result = await _mediaRepository.GetMediaDetailsAsync<Movie>(movieId, MediaType.Movie);

            return result;
        }

        [HttpGet("tv/{tvId}")]
        public async Task<ActionResult<Movie>> GetTvDetails(string tvId)
        {
            var result = await _mediaRepository.GetMediaDetailsAsync<TVShow>(tvId, MediaType.Tv);

            return result;
        }
    }
}
