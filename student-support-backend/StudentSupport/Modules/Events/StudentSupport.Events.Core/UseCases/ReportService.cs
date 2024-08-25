using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.API.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.UseCases
{
    public class ReportService : CrudService<ReportDto, Report>, IReportService
    {
        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;
        private readonly IEventService _eventService;
        private readonly IInternalPersonService _internalPersonService;

        public ReportService(IReportRepository reportRepository, IEventService eventService, IInternalPersonService internalPersonService, IMapper mapper) : base(reportRepository, mapper)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
            _eventService = eventService;
            _internalPersonService = internalPersonService;
        }

        public Result<ReportDto> Resolve(int id)
        {
            try
            {
                Report report = _reportRepository.Get(id);
                report.Resolve();
                _reportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch(KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ReportDto> Dismiss(int id)
        {
            try
            {
                Report report = _reportRepository.Get(id);
                report.Dismiss();
                _reportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ReportDto> Close(int id)
        {
            try
            {
                Report report = _reportRepository.Get(id);
                report.Close();
                _reportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<ReportDto>> ResolveAllByClubId(int clubId)
        {
            try
            {
                var reports = _reportRepository.GetPaged(0, 0).Results.Where(r => r.EventId == clubId);
                var reportsDto = new List<ReportDto>();
                foreach (var report in reports)
                {
                    report.Resolve();
                    reportsDto.Add(MapToDto(report));
                    _reportRepository.SaveChanges();
                }

                return reportsDto;
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }
    }
}
