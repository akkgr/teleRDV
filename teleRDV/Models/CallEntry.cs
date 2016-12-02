using System;
using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class CallEntry : BaseModel
    {
        public string ParentId { get; set; }

        [Required]
        public CallType CallType { get; set; }

        [Required]
        public DateTime Started { get; set; }

        [Required]
        public string Line { get; set; }
                
        public string PhoneNumber { get; set; }

        public string FullName { get; set; }

        public string PersonId { get; set; }

        public virtual Person Person { get; set; }

        public string Remarks { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }

        [Required]
        public CallStatus Status { get; set; }

        [Required]
        public CallReason Reason { get; set; }

        public DateTime? Ended { get; set; }

        public int Duration { get; set; }

        public string SubscriberId { get; set; }

        public virtual Subscriber Subscriber { get; set; }
    }
}