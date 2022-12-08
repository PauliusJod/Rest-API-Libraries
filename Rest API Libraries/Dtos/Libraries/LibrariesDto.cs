namespace Rest_API_Libraries.Dtos.Libraries
{
    public class LibrariesDto
    {
        public record LibraryDto(int LibraryId, string LibraryName, int CityId);
        public record CreateLibraryDto(string LibraryName, int CityId);
        public record UpdateLibraryDto(string LibraryName, int CityId);
    }
}
