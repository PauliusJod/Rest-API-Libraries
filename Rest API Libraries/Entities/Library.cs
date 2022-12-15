using System.ComponentModel.DataAnnotations;

namespace Rest_API_Libraries.Entities
{
    public class Library
    {
        public int Id { get; set; }
        public string LibraryName { get; set; }
        public int LibraryBookedBooks { get; set; }

        public City City { get; set; }


    }
}
