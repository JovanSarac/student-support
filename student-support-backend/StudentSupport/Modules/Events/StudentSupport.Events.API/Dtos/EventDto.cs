using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Dtos
{
    public class EventDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateEvent { get; set; }
        public DateTime DateEndEvent { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string EventType { get; set; }
        public DateTime DatePublication { get; set; }
        public List<string> Images { get;  set; }
        public bool IsArchived { get; set; }
        public double? Price { get; set; }
        public long? ClubId { get; set; }

    }
}
