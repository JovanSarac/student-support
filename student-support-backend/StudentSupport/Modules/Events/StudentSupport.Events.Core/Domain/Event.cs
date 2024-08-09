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
        public string Image {  get; init; }
        public bool IsArchived { get; set; }
        public double? Price { get; set; }
        public Event()
        {

        }
        public Event(long userId, string name, string description, DateTime dateEvent, DateTime dateEndEvent, string address, double latitude, double longitude, EventType eventType, DateTime datePublication, string image, bool isArchived, double price)
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
            Image = image;
            IsArchived = isArchived;
            Price = price;
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
