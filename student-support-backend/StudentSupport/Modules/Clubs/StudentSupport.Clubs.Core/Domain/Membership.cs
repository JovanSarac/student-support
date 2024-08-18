using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain
{
    public class Membership : Entity
    {
        public long MemberId { get; init; }
        public long ClubId { get; init; }
        public DateTime EnrollmentDate { get; init; }
        public Membership() { }

        public Membership(long memberId, long clubId, DateTime enrollmentDate)
        {
            MemberId = memberId;
            ClubId = clubId;
            EnrollmentDate=enrollmentDate;

            Validate();
        }

        private void Validate()
        {
            if (MemberId == 0) throw new ArgumentException("Invalid member ID");
            if (ClubId == 0) throw new ArgumentException("Invalid club ID");
        }
    }
}
