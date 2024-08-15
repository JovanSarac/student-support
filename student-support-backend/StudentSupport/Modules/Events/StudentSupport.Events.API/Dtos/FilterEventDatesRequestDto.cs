using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Dtos
{
    public class FilterEventDatesRequestDto
    {
        public List<EventDto> EventDtos { get; set; }
        public string DateEvents { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
    }
}
