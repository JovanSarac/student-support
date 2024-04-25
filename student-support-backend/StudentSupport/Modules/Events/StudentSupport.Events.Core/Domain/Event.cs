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
        public string Name { get; init; }
        public string Description { get; init; }
        public DateTime DateEvent { get; init; }
        public string Address {  get; init; }
        public EventType EventType { get; init; }
        public Event()
        {

        }
        public Event(string name, string description, DateTime dateEvent, string address, EventType eventType)
        {
            Name = name;
            Description = description;
            DateEvent = dateEvent;
            Address = address;
            EventType = eventType;
        }
    }

    public enum EventType
    {
        Fair,
        Humanitarian,
        Artistic,
        Sports,
        StudentParties,
        Trips
    }
}
