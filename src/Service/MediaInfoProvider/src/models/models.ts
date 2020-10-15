class Entity {
    id : number
}

class AbstractMedia extends Entity
{
    Title :String;

    Released : Date; 

    Length : number;

    Genre : string; //TODO: How to represent multiple genres?

    // Directors : Array<Person>;

    // Writers : Array<Person>;

    // Actors : Array<Person>;

    Plot : string;

    // Ratings : Array<Rating>;

    PosterPath : string;
}

enum MediaType
{
    Movie,
    Tv,
    Person
}

class PagedResult<T extends AbstractMedia>
{
    Page : number;

    TotalResults : number;

    TotalPages : number;

    Results : Array<T>;
}

// public class Suggestion : Entity
// {
//     public string Title;

//     public string Type;

//     public DateTime? Released;

//     public string PosterPath;
// }