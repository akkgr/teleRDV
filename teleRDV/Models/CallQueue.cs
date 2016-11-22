using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teleRDV.Models
{
    public class CallQueue : BaseModel
    {       
        public string Line { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public string Remarks { get; set; }
        public DateTime Inserted { get; set; }
        public string InUserId { get; set; }
        public DateTime? Closed { get; set; }
        public string OutUserId { get; set; }
    }
}
