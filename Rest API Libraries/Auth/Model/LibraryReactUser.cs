using Microsoft.AspNetCore.Identity;

namespace Rest_API_Libraries.Auth.Model
{
    public class LibraryReactUser
    {
        [PersonalData]
        public string userSurname { get; set; }
        [PersonalData]
        public int userAge { get; set; }



    }
}
