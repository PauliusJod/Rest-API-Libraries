using Rest_API_Libraries.Entities;
using Microsoft.AspNetCore.Mvc;
using static Rest_API_Libraries.Dtos.Libraries.LibrariesDto;
using Rest_API_Libraries.Repositories;
using Microsoft.AspNetCore.Authorization;
using Rest_API_Libraries.Auth;

namespace Rest_API_Libraries.Controllers
{
    [ApiController]
    [Route("api/cities/{cityId}/libraries")]
    public class LibrariesController : ControllerBase
    {
        private readonly ILibrariesRepositories _librariesRepository;
        private readonly ICitiesRepositories _citiesRepository;

        public LibrariesController(ILibrariesRepositories librariesRepository, ICitiesRepositories citiesRepository)
        {
            _librariesRepository = librariesRepository;
            _citiesRepository = citiesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<LibraryDto>> GetLibraries(int cityId)
        {
            var libraries = await _librariesRepository.GetLibrariesAsync(cityId);

            return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryBookedBooks));
            //return libraries.Select(o => new LibraryDto(o.libraryId, o.LibraryName, o.idCity));
        }
        
            
        [HttpGet]
        [Route("{libraryId}")]
        public async Task<ActionResult<LibraryDto>> GetLibrary(int cityId, int libraryId)
        {
            var libraries = await _librariesRepository.GetLibraryAsync(cityId, libraryId);

            // 404
            if (libraries == null)
                return NotFound();

            return new LibraryDto(libraries.Id, libraries.LibraryName, libraries.LibraryBookedBooks);
            //return new LibraryDto(libraries.libraryId, libraries.LibraryName, libraries.idCity);
        }

        [HttpPost]
        public async Task<ActionResult<LibraryDto>> Create(int cityId, CreateLibraryDto createLibraryDto)
        {

            var city = await _citiesRepository.GetCityAsync(cityId);
            if (city == null)
                return NotFound($"erorrasss");

            var library = new Library
            {
                LibraryName = createLibraryDto.LibraryName
                //idCity = createLibraryDto.CityId
            };

            library.City = city;
            await _librariesRepository.CreateAsync(library);

            // 201
            return Created($"api/cities/{cityId}/libraries/{library.Id}", new CreateLibraryDto(library.LibraryName));
            //return Created($"api/cities/{cityId}/libraries/{library.libraryId}", new CreateLibraryDto(library.LibraryName, library.idCity));
        }

        [HttpPut]
        [Authorize(Roles = LibrariesRoles.Admin)]
        [Route("{libraryId}")]
        public async Task<ActionResult<LibraryDto>> Update(int libraryId, int cityId, UpdateLibraryDto updateLibraryDto)
        {
            var library = await _librariesRepository.GetLibraryAsync(cityId, libraryId);


            if (library == null)
                return NotFound($"ERROR library {libraryId}");

            library.LibraryName = updateLibraryDto.LibraryName;
            await _librariesRepository.UpdateAsync(library);

            return Ok(new LibraryDto(library.Id, library.LibraryName, library.LibraryBookedBooks));
        }

        [HttpDelete]
        [Route("{libraryId}")]
        public async Task<ActionResult> Remove(int libraryId, int cityId)
        {
            var library = await _librariesRepository.GetLibraryAsync(cityId, libraryId);

            // 404
            if (library == null)
                return NotFound();
            await _librariesRepository.DeleteAsync(library);

            // 204
            return NoContent();
        }



    }
}
        //return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryDescription, o.LibraryBookedBooks)).Where(o => o.LibraryDescription == ".+5.+").ToList();
        //value.contains           
            //if (createLibraryDto.LibraryName.Contains("dddddd"))
            //    return NotFound("Blogas pavadinimas");

            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState); 