using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace teleRDV.Models
{
    public class Person : BaseModel
    {
        public Person()
        {
            Addresses = new List<Address>();
            Phones = new List<Phone>();
            Infos = new List<Info>();
            Relatives = new List<Person>();
            Appointments = new List<Appointment>();
        }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string FatherName { get; set; }

        public DateTime BirthDate { get; set; }

        public IList<Address> Addresses { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "At least a phone is required")]
        public IList<Phone> Phones { get; set; }

        public IList<Info> Infos { get; set; }

        public IList<Person> Relatives { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public string FullName { get { return string.Format("{0} {1}", LastName, FirstName); } }

        public string PhonesInfo
        {
            get
            {
                return string.Join(", ", Phones.Select(t => t.Value));
            }
        }

        public IList<Appointment> Appointments { get; set; }
    }
}