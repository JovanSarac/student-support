using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Dtos
{
    public class ClubDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long OwnerId { get; set; }
        public List<MembershipDto> Memberships { get; set; }
        public List<long> EventIds { get; set; }
        public int Status { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DatePublication { get; set; }
        public string CoverImage { get; init; }
    }
}
