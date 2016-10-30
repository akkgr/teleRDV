using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teleRDV.Models
{
    public enum WeekDay
    {
        Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }

    public class Schedule
    {
        public WeekDay WeekDay { get; set; }
        public IList<TimeEntry> TimeEntries { get; set; }
    }

    public class TimeEntry
    {
        public int StartHour { get; set; }
        public int StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
    }
}
