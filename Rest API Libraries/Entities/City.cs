using Rest_API_Libraries.Auth;
using System.ComponentModel.DataAnnotations;

namespace Rest_API_Libraries.Entities
{
    public class City : IUserOwnedResource
    {
        public int cityId { get; set; }
        public string cityName { get; set; }


        [Required]
        public string UserId { get; set; }
        public LibrariesUser User { get; set; }

    }
}
