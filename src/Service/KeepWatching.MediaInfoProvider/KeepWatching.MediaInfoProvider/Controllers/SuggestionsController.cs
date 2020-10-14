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
    public class SuggestionsController : ControllerBase
    {
        private readonly IMediaRepository _mediaRepository;

        public SuggestionsController(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suggestion>>> Get([FromQuery] string title)
        {
            var results = await _mediaRepository.GetSuggestionsAsync(title);

            return Ok(results);
        }
    }
}
