using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class SocialSecurityFund : BaseModel
    {
        [Required]
        public string Title { get; set; }
    }
}