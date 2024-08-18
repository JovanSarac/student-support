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
    public class ClubService : CrudService<ClubDto, Club>, IClubService
    {
        private readonly IClubRepository _clubRepository;
        private readonly IMembershipService _membershipService;
        private readonly IMapper _mapper;
        
        public ClubService(IClubRepository clubRepository, IMembershipService membershipService, IMapper mapper) : base(clubRepository, mapper)
        {
            _mapper = mapper;
            _clubRepository = clubRepository;
            _membershipService = membershipService;
        }

        public Result<PagedResult<ClubDto>> GetJoinedClubsPaged(int page, int pageSize, int studentId)
        {
            try
            {
                List<long> clubIds = _membershipService.GetClubIdListByStudentId(studentId).Value;

                var clubs = _clubRepository.GetClubsByIdsPaged(page, pageSize, clubIds);

                return MapToDto(clubs);
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(ex.Message);
            }
        }
    }
}
