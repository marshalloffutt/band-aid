using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class Band
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string LogoUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public bool Inactive { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        // Shindigs the band has scheduled
        public List <Shindig> Shindigs { get; set; }

        // Band members
        public List <User> Musicians { get; set; }
    }
}
