using Rest_API_Libraries.Entities;
using Rest_API_Libraries.Properties;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Rest_API_Libraries.Repositories
{
    //public interface IBooksRepositories
    //{
    //    Task CreateAsync(Book book);
    //    Task DeleteAsync(Book book);
    //    Task<Book?> GetBookAsync(int bookid);
    //    Task<List<Book>> GetBooksAsync();
    //    Task UpdateAsync(Book book);
    //}

    //public class BooksRepositories : IBooksRepositories
    //{
    //    private readonly LibrariesDbContext _librariesDbContext;
    //    public BooksRepositories(LibrariesDbContext librariesDbContext)
    //    {
    //        _librariesDbContext = librariesDbContext;
    //    }

    //    public async Task<Book?> GetBookAsync(int bookid)
    //    {
    //        return await _librariesDbContext.Books.FirstOrDefaultAsync(o => o.bookId == bookid);
    //    }
    //    public async Task<List<Book>> GetBooksAsync()
    //    {
    //        return await _librariesDbContext.Books.ToListAsync(); ///.Where(e => e.bookId >4)
    //    }

    //    public async Task CreateAsync(Book book)
    //    {
    //        _librariesDbContext.Books.Add(book);
    //        await _librariesDbContext.SaveChangesAsync();

    //    }
    //    public async Task UpdateAsync(Book book)
    //    {
    //        _librariesDbContext.Books.Update(book);
    //        await _librariesDbContext.SaveChangesAsync();

    //    }
    //    public async Task DeleteAsync(Book book)
    //    {
    //        _librariesDbContext.Books.Remove(book);
    //        await _librariesDbContext.SaveChangesAsync();

    //    }

    //}
}
