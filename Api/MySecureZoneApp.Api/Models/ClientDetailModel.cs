using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySecureZoneApp.Api.Models
{


    public class ClientDetailModel
    {
        public string Surname { get; set; }
        public string NickName { get; set; }
        public string FirstNames { get; set; }
        public string Initials { get; set; }
        public short Title { get; set; }
        public string Suffix { get; set; }
        public string IDNumber { get; set; }
        public short Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        public short BirthCountry { get; set; }
        public short CountryOfResidence { get; set; }
        public short Nationality { get; set; }
        public DateTime MarriageDate { get; set; }
        public short EmploymentStatus { get; set; }
        public string Salutation { get; set; }
        public string Email { get; set; }
        public string PostalAddress { get; set; }
        public string PhysicalAddress { get; set; }
        public string Diet { get; set; }
        public string Hobbies { get; set; }
        public short Language { get; set; }
    }

}