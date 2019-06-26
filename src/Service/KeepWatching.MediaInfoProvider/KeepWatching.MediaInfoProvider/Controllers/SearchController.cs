using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Model;
using KeepWatching.MediaInfoProvider.Repositories;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace KeepWatching.MediaInfoProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        public MediaController(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        //Search only TV Shows and Movies, episodes shall be redirected from the TV show homepage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AbstractMedia>>> Get([FromQuery] string title)
        {
            var results = await _mediaRepository.GetMediasByTitle(title);
             
            return Ok(results);
        }

        private readonly IMediaRepository _mediaRepository;
    }
}