using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class Specialty : BaseModel
    {
        [Required]
        public string Title { get; set; }
    }
}