using System.ComponentModel.DataAnnotations;

namespace Rest_API_Libraries.Auth
{
    public record RegisterUserDto([Required] string UserName, [EmailAddress][Required] string Email, [Required] string Password);
    public record LoginDto(string UserName, string Password);
    //public record LogoutDto(string UserName);



    public record UserDto(string Id, string UserName, string Email);
    //public record UserDto(int UserId, string UserName, string UserSurname, int UserAge); //, int CityId


    public record SuccessfullLoginDto(string AccessToken);

    //public record SuccessfulLoggedOutDto(string AccessToken);
}