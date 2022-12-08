using Rest_API_Libraries.Entities;
using Microsoft.AspNetCore.Mvc;
using static Rest_API_Libraries.Dtos.Books.BooksDto;
using Rest_API_Libraries.Repositories;

namespace Rest_API_Libraries.Controllers
{


    //[ApiController]
    //[Route("api/books")]
    //public class BooksController : ControllerBase
    //{

    //    private readonly IBooksRepositories _booksRepository;

    //    public BooksController(IBooksRepositories booksRepository)
    //    {
    //        _booksRepository = booksRepository;
    //    }
    //    //                    .AsNoTracking()
    //    //            .Include(o => o.District)
    //    //            .ThenInclude(o => o.City)
    //    //            .Where(o => o.District.City.Id == cityId)
    //    //            .ToListAsync();
    //    //}
    //    //api/v1/cities
    //    [HttpGet]
    //    public async Task<IEnumerable<BookDto>> GetBooks()
    //    {
    //        var books = await _booksRepository.GetBooksAsync();

    //        var books2 = books.Take(2);

    //        return books2.Select(o => new BookDto(o.libraryId, o.bookName, o.bookDesc, o.libraryId));
    //    }
        
    //        //return libraries.Select(o => new LibraryDto(o.Id, o.LibraryName, o.LibraryDescription, o.LibraryBookedBooks)).Where(o => o.LibraryDescription == ".+5.+").ToList();
    //    //api/v1/cities/{id}
    //    [HttpGet]
    //    [Route("{bookId}")]
    //    public async Task<ActionResult<BookDto>> GetBook(int bookId)
    //    {
    //        var book = await _booksRepository.GetBookAsync(bookId);

    //        // 404
    //        if (book == null)
    //            return NotFound();

    //        return new BookDto(book.bookId, book.bookName, book.bookDesc, book.libraryId);
    //    }
        //api/v1/cities
        //[HttpPost]
        //public async Task<ActionResult<UserDto>> Create(CreateUserDto createUserDto)
        //{

        //    var user = new User
        //    {
        //        userName = createUserDto.UserName,
        //        userSurname = createUserDto.UserSurname,
        //        userAge = createUserDto.UserAge
        //    };

        //    //library.District = district; //SVARBU
        //    await _usersRepository.CreateAsync(user);


        //    // 201
        //    return Created($"api/users/{user.userId}", new CreateUserDto(user.userName, user.userSurname, user.userAge));
        //}

        ////api/v1/cities/{id}
        //[HttpPut]
        //[Route("{userId}")]
        //public async Task<ActionResult<UserDto>> Update(int userId, UpdateUserDto updateUserDto)
        //{
        //    var user = await _usersRepository.GetUserAsync(userId);


        //    if (user == null)
        //        return NotFound($"ERROR user {userId}");

        //    user.userName = updateUserDto.UserName;
        //    user.userSurname = updateUserDto.UserSurname;
        //    user.userAge = updateUserDto.UserAge;
        //    await _usersRepository.UpdateAsync(user);

        //    return Ok(new UserDto(user.userId, user.userName, user.userSurname, user.userAge));
        //}

        ////api/v1/cities/{id}
        //[HttpDelete]
        //[Route("{userId}")]
        //public async Task<ActionResult> Remove(int userId)
        //{
        //    var user = await _usersRepository.GetUserAsync(userId);

        //    // 404
        //    if (user == null)
        //        return NotFound();
        //    await _usersRepository.DeleteAsync(user);

        //    // 204
        //    return NoContent();
        //}



    //}
}
