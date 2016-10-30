﻿using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class Phone
    {
        [Required]
        public PhoneType PhoneType { get; set; }

        [Required]
        public string Value { get; set; }
    }
}