using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teleRDV.Models
{
    public class CallEntry : BaseModel
    {
        public string CallNumber { get; set; }
        public CallType CallType { get; set; }
        public DateTime Started { get; set; }
        public DateTime Ended { get; set; }
        public string UserId { get; set; }
        public CallStatus Status { get; set; }
        public CallReason Reason { get; set; }
        public string Remarks { get; set; }
    }
}
