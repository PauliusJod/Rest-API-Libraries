namespace Rest_API_Libraries.Dtos.Books
{
    public class BooksDto
    {
        public record BookDto(int BookId, string BookName, string BookDesc, int LibraryId);
        public record CreateBookDto(string BookName, string BookDesc, int LibraryId);
        public record UpdateBookDto(string BookName, string BookDesc);
    }
}
