using Rest_API_Libraries.Entities;
using Microsoft.AspNetCore.Mvc;
using static Rest_API_Libraries.Dtos.Cities.CitiesDto;
using Rest_API_Libraries.Repositories;
using Rest_API_Libraries.Auth;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static Rest_API_Libraries.Dtos.Books.BooksDto;

namespace Rest_API_Libraries.Controllers
{


    [ApiController]
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {

        private readonly ICitiesRepositories _citiesRepository;
        private readonly IAuthorizationService _authorizationService;

        public CitiesController(ICitiesRepositories citiesRepository, IAuthorizationService authorizationService)
        {
            _citiesRepository = citiesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<CityDto>> GetCities()
        {
            var cities = await _citiesRepository.GetCitiesAsync();

            return cities.Select(o => new CityDto(o.Id, o.Name, o.Description, o.AmountOfLibraries));
        }

        [HttpGet]
        [Route("{cityId}", Name = "GetCity")]
        public async Task<ActionResult<CityDto>> GetCity(int cityid)
        {
            var city = await _citiesRepository.GetCityAsync(cityid);

            // 404
            if (city == null)
                return NotFound();

            return new CityDto(city.Id, city.Name, city.Description, city.AmountOfLibraries);
        }

        [HttpPost]
        [Authorize(Roles = LibrariesRoles.LibraryUser)]
        public async Task<ActionResult<CityDto>> Create(CreateCityDto createCityDto)
        {
            var city = new City
            {
                Name = createCityDto.Name,
                Description = createCityDto.Description,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) //"397cf6b0-c64a-46df-9861-c05bbdb612a8"      -Paulius1
            };
            await _citiesRepository.CreateAsync(city);


            // 201
            return CreatedAtAction("GetCity", new { cityId = city.Id }, new CreateCityDto(city.Name, city.Description));

        }


        //api/v1/cities/{id}
        [HttpPut]
        [Route("{cityid}")]
        [Authorize(Roles = LibrariesRoles.LibraryUser)]
        public async Task<ActionResult<CityDto>> Update(int cityid, UpdateCityDto updateCityDto)
        {
            var city = await _citiesRepository.GetCityAsync(cityid);

            // 404
            if (city == null)
                return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, city, PolicyNames.ResourceOwner);

            if (!authorizationResult.Succeeded)
                return Forbid("Not available for you!");    //402 arba NotFound() 404



            city.Description = updateCityDto.Description;
            await _citiesRepository.UpdateAsync(city);

            return Ok(new CityDto(city.Id, city.Name, city.Description, city.AmountOfLibraries));
        }

        //api/v1/cities/{id}
        [HttpDelete]
        [Route("{cityid}")]
        [Authorize(Roles = LibrariesRoles.LibraryUser)]
        public async Task<ActionResult> Remove(int cityid)
        {
            var city = await _citiesRepository.GetCityAsync(cityid);

            // 404
            if (city == null)
                return NotFound();
            await _citiesRepository.DeleteAsync(city);




            // 204
            return NoContent();
        }

        [HttpGet]
        [Route("{cityId}/cityBooks")]
        public async Task<IEnumerable<BookDto>> GetCityBooks(int cityId)
        {
            var books = await _citiesRepository.GetAllCityBooks(cityId);

            return books.Select(o => new BookDto(o.BookId, o.BookAuthor, o.BookName, o.BookDesc));

        }


    }
}

        //        //return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryDescription, o.LibraryBookedBooks)).Where(o => o.LibraryDescription == ".+5.+").ToList();