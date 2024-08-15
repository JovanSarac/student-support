using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Dtos
{
    public class FilterEventPriceRequestDto
    {
        public List<EventDto> EventDtos { get; set; }
        public string Price { get; set; }
    }
}
