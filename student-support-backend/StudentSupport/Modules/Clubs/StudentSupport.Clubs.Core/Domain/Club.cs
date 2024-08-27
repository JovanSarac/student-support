using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain
{
    public class Club : Entity
    {
        public string Name { get; init; }
        public string Description { get; init; }
        public long OwnerId { get; init; }
        public List<Membership> Memberships { get; init; }
        public List<Announcement> Announcements { get; init; }
        public List<long> EventIds { get; init; }
        public ClubStatus Status { get; private set; }
        public string Address { get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public DateTime DatePublication { get; init; }
        public CategoryClub CategoryClub {  get; init; }    
        public byte[] CoverImage { get; init; }

        public Club()
        {
            Memberships = new List<Membership>();
            Announcements = new List<Announcement>();
            EventIds = new List<long>();
        }

        public Club(string name, string description, long ownerId, ClubStatus clubStatus, string address, double latitude, double longitude, DateTime datePublication, CategoryClub categoryClub, byte[] coverImage)
        {
            Name = name;
            Description = description;
            OwnerId = ownerId;
            Memberships = new List<Membership>();
            Announcements = new List<Announcement>();
            EventIds = new List<long>();
            Status = clubStatus;
            Address = address;
            Latitude = latitude;
            Longitude = longitude;
            DatePublication = datePublication;
            CategoryClub = categoryClub;
            CoverImage = coverImage;

            Validate();
        }


        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description");
            if (string.IsNullOrWhiteSpace(Address)) throw new ArgumentException("Invalid Address");
            if (Latitude < -90 || Latitude > 90) throw new ArgumentException("Invalid Latitude");
            if (Longitude < -180 || Longitude > 180) throw new ArgumentException("Invalid Longitude");

            if (!Enum.IsDefined(typeof(ClubStatus), Status))
                throw new ArgumentException("Invalid ClubStatus");
        }

        public void Activate()
        {
            Validate();
            Status = ClubStatus.Active;
        }

        public void Close()
        {
            Validate();
            Status = ClubStatus.Closed;
        }

        public void CloseByAdmin()
        {
            Validate();
            Status = ClubStatus.ClosedByAdmin;
        }
    }
    public enum ClubStatus
    {
        Active,
        Closed,
        ClosedByAdmin
    }

    public enum CategoryClub
    {
        Sports,
        Artistic,
        Scientific,
        Cultural,
        Technical,
        Gaming,
        Social,
        Other
    }
}
