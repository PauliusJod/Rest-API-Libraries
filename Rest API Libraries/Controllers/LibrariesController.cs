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

        public LibrariesController(ILibrariesRepositories librariesRepository)
        {
            _librariesRepository = librariesRepository;
        }

        //                    .AsNoTracking()
        //            .Include(o => o.District)
        //            .ThenInclude(o => o.City)
        //            .Where(o => o.District.City.Id == cityId)
        //            .ToListAsync();
        //}
        //api/v1/cities
        [HttpGet]
        public async Task<IEnumerable<LibraryDto>> GetLibraries()
        {
            var libraries = await _librariesRepository.GetLibrariesAsync();

            return libraries.Select(o => new LibraryDto(o.libraryId, o.LibraryName, o.idCity));
        }
        
            //return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryDescription, o.LibraryBookedBooks)).Where(o => o.LibraryDescription == ".+5.+").ToList();
        //api/v1/cities/{id}
        [HttpGet]
        [Route("{libraryId}")]
        public async Task<ActionResult<LibraryDto>> GetLibrary(int libraryId)
        {
            var libraries = await _librariesRepository.GetLibraryAsync(libraryId);

            // 404
            if (libraries == null)
                return NotFound();

            return new LibraryDto(libraries.libraryId, libraries.LibraryName, libraries.idCity);
        }
        //api/v1/cities value.contains
        [HttpPost]
        public async Task<ActionResult<LibraryDto>> Create(CreateLibraryDto createLibraryDto)
        {
            //if (createLibraryDto.LibraryName.Contains("dddddd"))
            //    return NotFound("Blogas pavadinimas");

            if (!ModelState.IsValid)
                return BadRequest(ModelState); 

            var library = new Library
            {
                LibraryName = createLibraryDto.LibraryName,
                idCity = createLibraryDto.CityId
            };
            //library.District = district; //SVARBU
            await _librariesRepository.CreateAsync(library);

            // 201
            //return Created($"api/cities/{library.libraryId}", new CreateLibraryDto(library.LibraryName, library.idCity));
            return Created("", new CreateLibraryDto(library.LibraryName, library.idCity));
        }

        //api/v1/cities/{id}
        [HttpPut]
        [Authorize(Roles = LibrariesRoles.Admin)]
        [Route("{libraryId}")]
        public async Task<ActionResult<LibraryDto>> Update(int libraryId, UpdateLibraryDto updateLibraryDto)
        {
            var library = await _librariesRepository.GetLibraryAsync(libraryId);


            if (library == null)
                return NotFound($"ERROR library {libraryId}");

            library.LibraryName = updateLibraryDto.LibraryName;
            await _librariesRepository.UpdateAsync(library);

            return Ok(new LibraryDto(library.libraryId, library.LibraryName, library.idCity));
        }

        //api/v1/cities/{id}
        [HttpDelete]
        [Route("{libraryId}")]
        public async Task<ActionResult> Remove(int libraryId)
        {
            var library = await _librariesRepository.GetLibraryAsync(libraryId);

            // 404
            if (library == null)
                return NotFound();
            await _librariesRepository.DeleteAsync(library);

            // 204
            return NoContent();
        }



    }
}
