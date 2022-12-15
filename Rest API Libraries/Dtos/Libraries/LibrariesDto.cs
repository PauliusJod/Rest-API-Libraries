namespace Rest_API_Libraries.Dtos.Libraries
{
    public class LibrariesDto
    {
        public record LibraryDto(int Id, string LibraryName, int LibraryBookedBooks);
        public record CreateLibraryDto(string LibraryName);
        public record UpdateLibraryDto(string LibraryName);

    }
}
