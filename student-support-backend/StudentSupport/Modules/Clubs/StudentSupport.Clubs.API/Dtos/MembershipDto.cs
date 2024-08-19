using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Dtos
{
    public class MembershipDto
    {
        public long Id { get; set; }
        public long MemberId { get; set; }
        public long ClubId { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public int Status { get; set; }
    }
}
