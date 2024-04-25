using AutoMapper;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.Mappers
{
    public class EventsProfile : Profile
    {
        public EventsProfile() {
            CreateMap<Event, EventDto>().ReverseMap();
        }
    }
}
