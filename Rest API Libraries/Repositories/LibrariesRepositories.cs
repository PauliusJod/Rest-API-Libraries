using Rest_API_Libraries.Entities;
using Rest_API_Libraries.Properties;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Rest_API_Libraries.Repositories
{
    public interface ILibrariesRepositories
    {
        Task CreateAsync(Library library);
        Task DeleteAsync(Library library);
        Task<List<Library>> GetLibrariesAsync();
        Task<Library?> GetLibraryAsync(int libraryid);
        Task UpdateAsync(Library library);
    }

    public class LibrariesRepositories : ILibrariesRepositories
    {
        private readonly LibrariesDbContext _librariesDbContext;
        //Regex rx = new Regex(@".+5.+",
        //  RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public LibrariesRepositories(LibrariesDbContext librariesDbContext)
        {
            _librariesDbContext = librariesDbContext;
        }

        public async Task<Library?> GetLibraryAsync(int libraryid)
        {
            return await _librariesDbContext.Libraries.FirstOrDefaultAsync(o => o.libraryId == libraryid);
        }
        public async Task<List<Library>> GetLibrariesAsync()
        {
            //int aa = 11;
            //Where(obj => DbFunctions.Like(obj.Column, "%expression%")) "EF.Functions.Like(x.Name, \"%A%\")"
            return await _librariesDbContext.Libraries.ToListAsync(); //.Where(o => o.LibraryBookedBooks == aa)
                                                                      //.Where(o => rx.Matches(o.LibraryDescription)).ToListAsync();
        }

        public async Task CreateAsync(Library library)
        {
            _librariesDbContext.Libraries.Add(library);
            await _librariesDbContext.SaveChangesAsync();

        }
        public async Task UpdateAsync(Library library)
        {
            _librariesDbContext.Libraries.Update(library);
            await _librariesDbContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(Library library)
        {
            _librariesDbContext.Libraries.Remove(library);
            await _librariesDbContext.SaveChangesAsync();

        }

    }
}
