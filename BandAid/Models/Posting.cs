using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class Posting
    {
        public int Id { get; set; }
        public string InstrumentRequested { get; set; }
        public string Description { get; set; }
        public bool Closed { get; set; }
        public int BandId { get; set; }
    }
}
