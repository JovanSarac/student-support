using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Public
{
    public interface IReportService
    {
        Result<PagedResult<ReportDto>> GetPaged(int page, int pageSize);
        Result<ReportDto> Get(int id);
        Result<ReportDto> Create(ReportDto reportDto);
        Result<ReportDto> Update(ReportDto reportDto);
        Result Delete(int id);
        Result<ReportDto> Resolve(int id);
        Result<ReportDto> Dismiss(int id);
        Result<ReportDto> Close(int id);
        Result<List<ReportDto>> ResolveAllByClubId(int clubId);
    }
}
