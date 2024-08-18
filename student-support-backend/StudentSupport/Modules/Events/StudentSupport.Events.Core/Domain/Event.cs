using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.Domain
{
    public class Event : Entity
    {
        public long UserId { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public DateTime DateEvent { get; init; }
        public DateTime DateEndEvent { get; init; }
        public string Address {  get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public EventType EventType { get; init; }
        public DateTime DatePublication { get; init; }
        public List<byte[]> Images {  get; init; }
        public bool IsArchived { get; set; }
        public double? Price { get; set; }
        public long? ClubId { get; init; }

        public Event()
        {
            Images = new List<byte[]>();
        }
        public Event(long userId, string name, string description, DateTime dateEvent, DateTime dateEndEvent, string address, double latitude, double longitude, EventType eventType, DateTime datePublication, List<byte[]> images, string image, bool isArchived, double price, long? clubId)
        {
            UserId = userId;
            Name = name;
            Description = description;
            DateEvent = dateEvent;
            DateEndEvent = dateEndEvent;
            Address = address;
            Latitude = latitude;
            Longitude = longitude;
            EventType = eventType;
            DatePublication = datePublication;
            Images = images ?? new List<byte[]>();
            IsArchived = isArchived;
            Price = price;
            ClubId = clubId;

            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description");
            if (DateEvent == default) throw new ArgumentException("Invalid DateEvent");
            if (DateEndEvent == default) throw new ArgumentException("Invalid DateEndEvent");
            if (DateEvent > DateEndEvent) throw new ArgumentException("DateEvent must be earlier than DateEndEvent");
            if (string.IsNullOrWhiteSpace(Address)) throw new ArgumentException("Invalid Address");
            if (Latitude < -90 || Latitude > 90) throw new ArgumentException("Invalid Latitude");
            if (Longitude < -180 || Longitude > 180) throw new ArgumentException("Invalid Longitude");
            if (DatePublication == default) throw new ArgumentException("Invalid DatePublication");
            if (Price < 0) throw new ArgumentException("Invalid Price");

            if (!Enum.IsDefined(typeof(EventType), EventType))
                throw new ArgumentException("Invalid EventType");
        }

        public void Archive()
        {
            IsArchived = true;
        }

        public void Publish()
        {
            IsArchived = false;
        }

    }

    public enum EventType
    {
        AcademicConferenceAndSeminars,
        WorkshopsAndCourses,
        CulturalEvent,
        Fair,
        HumanitarianEvent,
        ArtExhibitionsAndPerformances,
        StudentPartiesAndSocialEvents,
        Competitions,
        StudentTrips,
        Other
    }
}
