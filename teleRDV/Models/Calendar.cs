﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teleRDV.Models
{
    public class Calendar
    {
        public Calendar()
        {
            TimeTable = new List<Models.TimeTable>();
        }
        public DateTime Day { get; set; }
        public bool Active { get; set; }
        public List<TimeTable> TimeTable { get; set; }
    }

    public class TimeTable
    {
        public DateTime Time { get; set; }
        public bool Free { get; set; }
    }
}
