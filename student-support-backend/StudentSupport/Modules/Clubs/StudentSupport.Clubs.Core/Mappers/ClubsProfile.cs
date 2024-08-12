using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.Core.Domain;

namespace StudentSupport.Clubs.Core.Mappers
{
    public class ClubsProfile : Profile
    {
        public ClubsProfile()
        {
            CreateMap<Club, ClubDto>().ReverseMap();
        }
    }
}
