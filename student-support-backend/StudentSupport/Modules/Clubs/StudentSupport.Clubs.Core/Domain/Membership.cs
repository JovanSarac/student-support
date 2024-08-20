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
        public MembershipStatus Status { get; set; }
        public Membership() { }

        public Membership(long memberId, long clubId, DateTime enrollmentDate, MembershipStatus status)
        {
            MemberId = memberId;
            ClubId = clubId;
            EnrollmentDate=enrollmentDate;
            Status = status;

            Validate();
        }

        private void Validate()
        {
            if (MemberId == 0) throw new ArgumentException("Invalid member ID");
            if (ClubId == 0) throw new ArgumentException("Invalid club ID");
        }

        public void Leave()
        {
            Validate();
            Status = MembershipStatus.Left;
        }

        public void Suspend()
        {
            Validate();
            Status = MembershipStatus.Suspended;
        }

        public void MakeAnAdmin()
        {
            Validate();
            Status = MembershipStatus.ClubAdmin;
        }

        public void MakeAMember()
        {
            Validate();
            Status = MembershipStatus.Member;
        }
    }
    public enum MembershipStatus
    {
        Member,
        ClubAdmin,
        Left,
        Suspended,
    }
}
