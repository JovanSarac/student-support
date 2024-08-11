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
            CreateMap<Event, EventDto>()
           .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
               src.Images != null ?  src.Images.ConvertAll(image => "data:image/webp;base64," + Convert.ToBase64String(image)) : new List<string>()));

            CreateMap<EventDto, Event>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
                    src.Images != null ? src.Images.ConvertAll(image => Convert.FromBase64String(image.Replace("data:image/webp;base64,", ""))) : new List<byte[]>()));
        }
    }
}
