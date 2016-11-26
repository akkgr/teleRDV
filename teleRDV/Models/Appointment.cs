using System;
using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class Appointment : BaseModel
    {
        [Required]
        public string SubscriberId { get; set; }

        [Required]
        public string PersonId { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public string Remarks { get; set; }

        [Required]
        public AppointmentStatus Status { get; set; }

        [Required]
        public string UserId { get; set; }

        public Subscriber Subscriber { get; set; }

        public Person Person { get; set; }

        public User User { get; set; }
    }
}