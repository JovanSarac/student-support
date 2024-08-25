using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Dtos
{
    public class AnnouncementDto
    {
        public long Id { get; set; }
        public long ClubId { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Content { get; set; }
        public long AnnouncerId { get; set; }
        public List<string> Images { get; set; }
    }
}
