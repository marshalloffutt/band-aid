using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class CreateShindigRequest
    {
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zipcode { get; set; }
        public bool HasComeToPass { get; set; }
    }
}
