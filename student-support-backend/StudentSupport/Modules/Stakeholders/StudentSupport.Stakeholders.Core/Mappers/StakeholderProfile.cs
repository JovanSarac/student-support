using AutoMapper;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.Core.Domain;

namespace StudentSupport.Stakeholders.Core.Mappers;

public class StakeholderProfile : Profile
{
    public StakeholderProfile()
    {
        CreateMap<PersonDto, Person>().ReverseMap();
    }
}