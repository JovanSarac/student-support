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
        Result<PagedResult<ClubDto>> GetCreatedClubsPaged(int page, int pageSize, int authorId);
        Result<bool> IsAuthorOfClub(int authorId, int clubId);
        Result<ClubDto> Create(ClubDto eventDto);
        Result<ClubDto> Update(ClubDto eventDto);
        Result Delete(int id);
        Result<ClubDto> Get(int id);
        Result<ClubDto> CloseClub(int id);
        Result<ClubDto> CloseClubByAdmin(int id);
        Result<ClubDto> ActivateClub(int id);
        Result<PagedResult<ClubDto>> GetAllActiveClubs(int page, int pageSize);
        Result<List<ClubDto>> GetMostPopularTwoClubs();
        Result<List<ClubDto>> GetClubsBySearchName(List<ClubDto> clubDtos, string? searchName);
        Result<List<ClubDto>> GetClubsByCategories(List<ClubDto> clubDtos, List<string> categories);
    }
}
