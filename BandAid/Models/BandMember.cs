using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class BandMember
    {
        public int Id { get; set; }
        public int MusicianId { get; set; }
        public int BandId { get; set; }
    }
}
