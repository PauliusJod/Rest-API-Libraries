namespace Rest_API_Libraries.Dtos.Cities
{
    public class CitiesDto
    {

        public record CityDto(int Id, string Name, string Description, int AmountOfLibraries);
        public record CreateCityDto(string Name, string Description);
        public record UpdateCityDto(string Description);

    }
}
