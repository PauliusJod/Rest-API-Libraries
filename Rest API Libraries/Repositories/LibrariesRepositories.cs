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
        Task<List<Library>> GetLibrariesAsync(int cityId);
        Task<Library?> GetLibraryAsync(int cityId, int libraryId);
        Task UpdateAsync(Library library);
    }

    public class LibrariesRepositories : ILibrariesRepositories
    {
        private readonly LibrariesDbContext _librariesDbContext;

        public LibrariesRepositories(LibrariesDbContext librariesDbContext)
        {
            _librariesDbContext = librariesDbContext;
        }

        public async Task<Library?> GetLibraryAsync(int cityId, int libraryId)
        {
            return await _librariesDbContext.Libraries.FirstOrDefaultAsync(o => o.City.Id == cityId && o.Id == libraryId);
        }

        public async Task<List<Library>> GetLibrariesAsync(int cityId)
        {
            return await _librariesDbContext.Libraries.Where(o => o.City.Id == cityId).ToListAsync();
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
//Regex rx = new Regex(@".+5.+",
//  RegexOptions.Compiled | RegexOptions.IgnoreCase);
//int aa = 11;
//Where(obj => DbFunctions.Like(obj.Column, "%expression%")) "EF.Functions.Like(x.Name, \"%A%\")"
//.Where(o => o.LibraryBookedBooks == aa)
//.Where(o => rx.Matches(o.LibraryDescription)).ToListAsync();