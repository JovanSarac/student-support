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
            CreateMap<Club, ClubDto>()
                .ForMember(dest => dest.CoverImage, opt => opt.MapFrom(src => src.CoverImage != null ? "data:image/webp;base64," + Convert.ToBase64String(src.CoverImage) : null));

            CreateMap<ClubDto, Club>()
                .ForMember(dest => dest.CoverImage, opt => opt.MapFrom(src => src.CoverImage != null ? Convert.FromBase64String(src.CoverImage.Replace("data:image/webp;base64,", "")) : null));

            CreateMap<Membership, MembershipDto>().ReverseMap();

            CreateMap<Announcement, AnnouncementDto>()
           .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
               src.Images != null ? src.Images.ConvertAll(image => "data:image/webp;base64," + Convert.ToBase64String(image)) : new List<string>()));

            CreateMap<AnnouncementDto, Announcement>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
                    src.Images != null ? src.Images.ConvertAll(image => Convert.FromBase64String(image.Replace("data:image/webp;base64,", ""))) : new List<byte[]>()));
        }
    }
}
