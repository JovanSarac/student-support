using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Public
{
    public interface IAnnouncementService
    {
        Result<PagedResult<AnnouncementDto>> GetPaged(int page, int pageSize);
        Result<AnnouncementDto> Create(AnnouncementDto announcementDto);
        Result<AnnouncementDto> Update(AnnouncementDto announcementDto);
        Result Delete(int id);
        Result<AnnouncementDto> Get(int id);

        Result<PagedResult<AnnouncementDto>> GetAllByClubIdPaged(int page, int pageSize, int clubId);
    }
}
