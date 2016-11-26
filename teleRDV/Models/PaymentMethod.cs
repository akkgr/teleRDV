using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class PaymentMethod : BaseModel
    {
        [Required]
        public string Title { get; set; }
    }
}