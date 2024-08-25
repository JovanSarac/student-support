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
    public interface IClubReportService
    {
        Result<PagedResult<ClubReportDto>> GetPaged(int page, int pageSize);
        Result<ClubReportDto> Get(int id);
        Result<ClubReportDto> Create(ClubReportDto reportDto);
        Result<ClubReportDto> Update(ClubReportDto reportDto);
        Result Delete(int id);
        Result<ClubReportDto> Resolve(int id);
        Result<ClubReportDto> Dismiss(int id);
        Result<ClubReportDto> Close(int id);
        Result<List<ClubReportDto>> ResolveAllByClubId(int clubId);
    }
}
