﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Dtos
{
    public class FilterEventTypesRequestDto
    {
        public List<EventDto> EventDtos { get; set; }
        public List<string> TypeOfEvents { get; set; }
    }
}
