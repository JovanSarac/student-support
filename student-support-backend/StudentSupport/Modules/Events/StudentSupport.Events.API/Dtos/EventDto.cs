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
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateEvent { get; set; }
        public string Address { get; set; }
        public string EventType { get; set; }
    }
}
