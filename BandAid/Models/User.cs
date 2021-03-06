﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public long Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zipcode { get; set; }
        public string Instrument { get; set; }
        public int YearsOfExp { get; set; }
        public string ImageUrl { get; set; }
        public string Bio { get; set; }
        public bool Inactive { get; set; }

        // Bands user is in
        public List<Band> Bands { get; set; }
    }
}
