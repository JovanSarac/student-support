using AutoMapper;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.Core.Domain;

namespace StudentSupport.Stakeholders.Core.Mappers;

public class StakeholderProfile : Profile
{
    public StakeholderProfile()
    {

        CreateMap<Person, PersonDto>()
            .ForMember(dest => dest.ProfilePicBase64, opt => opt.MapFrom(src =>
                src.ProfilePic != null ? "data:image/webp;base64," + Convert.ToBase64String(src.ProfilePic) : null));

        // Ako imate mapiranje iz DTO nazad u entitet, dodajte i ovo:
        CreateMap<PersonDto, Person>()
            .ForMember(dest => dest.ProfilePic, opt => opt.MapFrom(src =>
                src.ProfilePicBase64 != null ?
                Convert.FromBase64String(src.ProfilePicBase64.Replace("data:image/webp;base64,", "")) : null));
    }
}