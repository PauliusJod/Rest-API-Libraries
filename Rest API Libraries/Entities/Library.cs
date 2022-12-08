using System.ComponentModel.DataAnnotations;

namespace Rest_API_Libraries.Entities
{
    public class Library : IValidatableObject
    {
        public int libraryId { get; set; }
        public string LibraryName { get; set; }
        public int idCity { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //if(validationContext.Items.Values ) ;
            var results = new List<ValidationResult>();
            if (LibraryName == "1")
            {
                results.Add(new ValidationResult("blogai"));    
            }
            return results;
        }
    }
}
