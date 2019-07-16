using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Models
{
    public class CreatePostingReplyRequest
    {
        public DateTime DateCreated { get; set; }
        public int PostingId { get; set; }
        public int MusicianId { get; set; }
        public string Message { get; set; }
        public bool Closed { get; set; }
    }
}
