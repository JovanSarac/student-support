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
    public interface IClubService
    {
        Result<PagedResult<ClubDto>> GetPaged(int page, int pageSize);
        Result<PagedResult<ClubDto>> GetJoinedClubsPaged(int page, int pageSize, int studentId);
        Result<ClubDto> Create(ClubDto eventDto);
        Result<ClubDto> Update(ClubDto eventDto);
        Result Delete(int id);
        Result<ClubDto> Get(int id);
    }
}
