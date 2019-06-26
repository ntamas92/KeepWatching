using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeepWatching.MediaInfoProvider.Configuration;
using KeepWatching.MediaInfoProvider.Connections.Interfaces;
using KeepWatching.MediaInfoProvider.Connections.TMDB;
using KeepWatching.MediaInfoProvider.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KeepWatching.MediaInfoProvider
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson();

            services.Configure<TMDBAPISettings>(Configuration.GetSection("TMDB").GetSection("API"));

            services.AddHttpClient<IHttpRequestHandler, TMDBService>();
            services.AddTransient<IMediaRepository, TMDBMediaRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                //TODO: Configure CORS correctly upon deployment.
                app.UseCors(builder => builder.AllowAnyOrigin());
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}