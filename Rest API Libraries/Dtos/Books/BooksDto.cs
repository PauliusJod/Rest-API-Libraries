namespace Rest_API_Libraries.Dtos.Books
{
    public class BooksDto
    {
        public record BookDto(int BookId, string BookAuthor, string BookName, string BookDesc);
        public record CreateBookDto(string BookAuthor, string BookName, string BookDesc);
        public record UpdateBookDto(string BookDesc);

    }
}
