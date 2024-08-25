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
    public interface IMembershipService
    {
        Result<PagedResult<MembershipDto>> GetPaged(int page, int pageSize);
        Result<MembershipDto> Create(MembershipDto membershipDto);
        Result<MembershipDto> Update(MembershipDto membershipDto);
        Result Delete(int id);
        Result<MembershipDto> Get(int id);
        Result<List<long>> GetClubIdListByStudentId(long studentId);
        Result<MembershipDto> LeaveClub(long membershipId);
        Result<MembershipDto> SuspendMember(long membershipId);
        Result<MembershipDto> PromoteToClubAdmin(long membershipId);
        Result<MembershipDto> MakeAMember(long membershipId);
        Result<List<long>> GetMemberIdListByClubId(int clubId);
        Task DeleteAllByAdmin(ClubDto clubDto);

    }
}
