namespace Rest_API_Libraries.Dtos.Cities
{
    public class CitiesDto
    {

        public record CityDto(int Id, string Name, string Description, int AmountOfLibraries);
        public record CreateCityDto(string Name, string Description);
        public record UpdateCityDto(string Description);

        //public record CityDto(int CityId, string CityName, string UserId);
        //public record CreateCityDto(string CityName, string UserId);
        //public record UpdateCityDto(string CityName, string UserId);
    }
}
