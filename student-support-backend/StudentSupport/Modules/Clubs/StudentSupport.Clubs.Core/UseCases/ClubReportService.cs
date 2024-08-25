using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.API.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class ClubReportService : CrudService<ClubReportDto, ClubReport>, IClubReportService
    {
        private readonly IClubReportRepository _clubReportRepository;
        private readonly IMapper _mapper;
        private readonly IClubService _clubService;
        private readonly IInternalPersonService _internalPersonService;

        public ClubReportService(IClubReportRepository clubReportRepository, IClubService clubService, IInternalPersonService internalPersonService, IMapper mapper) : base(clubReportRepository, mapper)
        {
            _clubReportRepository = clubReportRepository;
            _mapper = mapper;
            _clubService = clubService;
            _internalPersonService = internalPersonService;
        }

        public Result<ClubReportDto> Resolve(int id)
        {
            try
            {
                ClubReport report = _clubReportRepository.Get(id);
                report.Resolve();
                _clubReportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ClubReportDto> Dismiss(int id)
        {
            try
            {
                ClubReport report = _clubReportRepository.Get(id);
                report.Dismiss();
                _clubReportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ClubReportDto> Close(int id)
        {
            try
            {
                ClubReport report = _clubReportRepository.Get(id);
                report.Close();
                _clubReportRepository.SaveChanges();
                return MapToDto(report);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<ClubReportDto>> ResolveAllByClubId(int clubId)
        {
            try
            {
                var reports = _clubReportRepository.GetPaged(0, 0).Results.Where(r => r.ClubId == clubId);
                var reportsDto = new List<ClubReportDto>();
                foreach (var report in reports)
                {
                    report.Resolve();
                    reportsDto.Add(MapToDto(report));
                    _clubReportRepository.SaveChanges();
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
