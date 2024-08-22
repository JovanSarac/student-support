using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class AnnouncementService : CrudService<AnnouncementDto, Announcement>, IAnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IMapper _mapper;

        public AnnouncementService(IAnnouncementRepository announcementRepository, IMapper mapper) : base(announcementRepository, mapper)
        {
            _announcementRepository = announcementRepository;
            _mapper = mapper;
        }

        public Result<PagedResult<AnnouncementDto>> GetAllByClubIdPaged(int page, int pageSize, int clubId)
        {
            try
            {
                var announcements = _announcementRepository.GetAllByClubIdPaged(page, pageSize, clubId);

                return MapToDto(announcements);
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }
    }
}
