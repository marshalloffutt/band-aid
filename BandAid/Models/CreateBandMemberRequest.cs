using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class CreateBandMemberRequest
    {
        public int MusicianId { get; set; }
        public int BandId { get; set; }
        public DateTime DateJoined { get; set; }
    }
}
