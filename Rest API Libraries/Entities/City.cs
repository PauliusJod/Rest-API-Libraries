using Rest_API_Libraries.Auth;
using System.ComponentModel.DataAnnotations;

namespace Rest_API_Libraries.Entities
{
    public class City : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AmountOfLibraries { get; set; }
        public int AmountOfBooks { get; set; }

        [Required]
        public string UserId { get; set; }

        public LibrariesUser User { get; set; }
    }
}
