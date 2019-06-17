using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Model;
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
        
        //Search only TV Shows and Movies, episodes shall be redirected from the TV show homepage
        [HttpGet]
        public async Task<IEnumerable<AbstractMedia>> Get(string title)
        {

            QueryBuilder queryBuilder = new QueryBuilder();
            queryBuilder.Add("query", title);
            //queryBuilder.Add("api_key", "yourapikeyhere");

            UriBuilder uriBuilder = new UriBuilder("https", "api.themoviedb.org");
            uriBuilder.Path = "3/search/multi";
            uriBuilder.Query = queryBuilder.ToQueryString().ToUriComponent();

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(uriBuilder.Uri);
                string result = await response.Content.ReadAsStringAsync();

                IEnumerable<AbstractMedia> movies = JObject.Parse(result)
                    .GetValue("results")
                    .Children()
                    .Where(x => x.Value<string>("media_type").Equals("movie"))
                    .Select(x => x.Value<string>("title"))
                    .Select(x => new Movie() { Title = x });

                return movies;
            }
        }

        //[HttpGet]
        //public ActionResult<AbstractMedia> Get(string id)
        //{

        //}

    }
}