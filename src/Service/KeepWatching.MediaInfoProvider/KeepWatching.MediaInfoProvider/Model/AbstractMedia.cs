using System;
using System.Collections.Generic;

namespace KeepWatching.MediaInfoProvider.Model
{
    public abstract class AbstractMedia
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public DateTime Released { get; set; }

        public uint Length { get; set; }

        public string Genre { get; set; } //TODO: How to represent multiple genres?

        public IEnumerable<Person> Directors { get; set; }

        public IEnumerable<Person> Writers { get; set; }

        public IEnumerable<Person> Actors { get; set; }

        public string Plot { get; set; }

        public IEnumerable<Rating> Ratings { get; set; }

        public string PosterPath { get; set; }
    }
}
