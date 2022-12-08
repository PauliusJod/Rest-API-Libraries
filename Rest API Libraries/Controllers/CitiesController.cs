using Rest_API_Libraries.Entities;
using Microsoft.AspNetCore.Mvc;
using static Rest_API_Libraries.Dtos.Cities.CitiesDto;
using Rest_API_Libraries.Repositories;
using Rest_API_Libraries.Auth;

namespace Rest_API_Libraries.Controllers
{


    [ApiController]
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {

        private readonly ICitiesRepositories _citiesRepository;

        public CitiesController(ICitiesRepositories citiesRepository)
        {
            _citiesRepository = citiesRepository;
        }
        //                    .AsNoTracking()
        //            .Include(o => o.District)
        //            .ThenInclude(o => o.City)
        //            .Where(o => o.District.City.Id == cityId)
        //            .ToListAsync();
        //}
        //api/v1/cities
        [HttpGet]
        public async Task<IEnumerable<CityDto>> GetCities()
        {
            var cities = await _citiesRepository.GetCitiesAsync();

            return cities.Select(o => new CityDto(o.cityId, o.cityName,o.UserId));
        }

        //        //return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryDescription, o.LibraryBookedBooks)).Where(o => o.LibraryDescription == ".+5.+").ToList();
        //api/v1/cities/{id}
        [HttpGet]
        [Route("{cityId}")]
        public async Task<ActionResult<CityDto>> GetCity(int cityId)
        {
            var city = await _citiesRepository.GetCityAsync(cityId);

            // 404
            if (city == null)
                return NotFound();

            return new CityDto(city.cityId, city.cityName, city.UserId);
        }
        //api/v1/cities
        [HttpPost]
        public async Task<ActionResult<CityDto>> Create(CreateCityDto createCityDto)
        {
            var city = new City
            {
                cityName = createCityDto.CityName,
                UserId = createCityDto.UserId
            };
            //library.District = district; //SVARBU
            await _citiesRepository.CreateAsync(city);
            // 201
            return Created($"api/cities/{city.cityId}", new CreateCityDto(city.cityName, city.UserId));
        }

        //api/v1/cities/{id}
        [HttpPut]
        [Route("{cityId}")]
        public async Task<ActionResult<CityDto>> Update(int cityId, UpdateCityDto updateCityDto)
        {
            var city = await _citiesRepository.GetCityAsync(cityId);


            if (city == null)
                return NotFound($"ERROR user {cityId}");

            city.cityName = updateCityDto.CityName;
            await _citiesRepository.UpdateAsync(city);

            return Ok(new CityDto(city.cityId, city.cityName, city.UserId));
        }

        //api/v1/cities/{id}
        [HttpDelete]
        [Route("{cityId}")]
        public async Task<ActionResult> Remove(int cityId)
        {
            var city = await _citiesRepository.GetCityAsync(cityId);

            // 404
            if (city == null)
                return NotFound();
            await _citiesRepository.DeleteAsync(city);

            // 204
            return NoContent();
        }



    }
}
