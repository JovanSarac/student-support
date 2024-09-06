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
using System.Security.Claims;
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

        public Result<ClubDto> ActivateClub(int id, ClaimsPrincipal user)
        {
            try
            {
                Club club = _clubRepository.Get(id);
                var loggedInUserId = user.FindFirst("id")?.Value;

                if (loggedInUserId != club.OwnerId.ToString())
                {
                    return Result.Fail(FailureCode.Forbidden).WithError("You do not have permission to activate this club.");
                }
                club.Activate();
                _clubRepository.SaveChanges();

                return MapToDto(club);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ClubDto> CloseClub(int id, ClaimsPrincipal user)
        {
            try
            {
                Club club = _clubRepository.Get(id);
                var loggedInUserId = user.FindFirst("id")?.Value;

                if (loggedInUserId != club.OwnerId.ToString())
                {
                    return Result.Fail(FailureCode.Forbidden).WithError("You do not have permission to close this club.");
                }
                club.Close();
                _clubRepository.SaveChanges();

                return MapToDto(club);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<ClubDto> CloseClubByAdmin(int id)
        {
            try
            {
                Club club = _clubRepository.Get(id);
                club.CloseByAdmin();
                _clubRepository.SaveChanges();

                return MapToDto(club);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<PagedResult<ClubDto>> GetAllActiveClubs(int page, int pageSize)
        {
            var result = _clubRepository.GetAllActiveClubs(page, pageSize);
            return MapToDto(result);
        }

        public Result<PagedResult<ClubDto>> GetCreatedClubsPaged(int page, int pageSize, int authorId)
        {
            try
            {
                var clubs = _clubRepository.GetClubsByAuthorIdPaged(page, pageSize, authorId);

                return MapToDto(clubs);
            }
            catch(ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
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
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<List<ClubDto>> GetMostPopularTwoClubs()
        {
            return MapToDto(_clubRepository.GetMostPopularTwoClubs());
        }

        public Result<bool> IsAuthorOfClub(int authorId, int clubId)
        {
            try
            {
                var clubCount = _clubRepository.GetPaged(0, 0).Results.Count(c => c.Id == clubId && c.OwnerId == authorId);

                if(clubCount == 0)
                {
                    return false;
                }

                return true;
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<List<ClubDto>> GetClubsBySearchName(List<ClubDto> clubDtos, string? searchName)
        {
            if (searchName == null)
                return clubDtos;
            var result = clubDtos.FindAll(e => e.Name.ToUpper().Contains(searchName.ToUpper()));
            return result;
        }

        public Result<List<ClubDto>> GetClubsByCategories(List<ClubDto> clubDtos, List<string> categories)
        {
            if (categories.Count == 0)
                return clubDtos;

            var result = clubDtos.FindAll(c => categories.Contains(c.CategoryClub));
            return result;
        }
    }
}
