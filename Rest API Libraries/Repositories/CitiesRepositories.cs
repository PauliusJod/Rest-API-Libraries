using Rest_API_Libraries.Entities;
using Rest_API_Libraries.Properties;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Rest_API_Libraries.Repositories
{
    public interface ICitiesRepositories
    {
        Task CreateAsync(City city);
        Task DeleteAsync(City city);
        Task<IReadOnlyList<Book>> GetAllCityBooks(int cityId);
        Task<List<City>> GetCitiesAsync();
        Task<City?> GetCityAsync(int cityid);
        Task UpdateAsync(City city);
    }

    public class CitiesRepositories : ICitiesRepositories
    {
        private readonly LibrariesDbContext _librariesDbContext;

        public CitiesRepositories(LibrariesDbContext librariesDbContext)
        {
            _librariesDbContext = librariesDbContext;
        }

        public async Task<City?> GetCityAsync(int cityid)
        {
            return await _librariesDbContext.Cities.FirstOrDefaultAsync(o => o.Id == cityid);
        }
        public async Task<List<City>> GetCitiesAsync()
        {
            return await _librariesDbContext.Cities.ToListAsync();
        }

        public async Task CreateAsync(City city)
        {
            _librariesDbContext.Cities.Add(city);
            await _librariesDbContext.SaveChangesAsync();

        }
        public async Task UpdateAsync(City city)
        {
            _librariesDbContext.Cities.Update(city);
            await _librariesDbContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(City city)
        {
            _librariesDbContext.Cities.Remove(city);
            await _librariesDbContext.SaveChangesAsync();

        }
        public async Task<IReadOnlyList<Book>> GetAllCityBooks(int cityId)
        {
            return await _librariesDbContext.Books
                .AsNoTracking()
                .Include(o => o.library)
                .ThenInclude(o => o.City)
                .Where(o => o.library.City.Id == cityId)
                .ToListAsync();
        }

    }
}
