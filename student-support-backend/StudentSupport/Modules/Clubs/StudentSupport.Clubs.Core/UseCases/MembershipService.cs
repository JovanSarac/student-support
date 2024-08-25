using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class MembershipService : CrudService<MembershipDto, Membership>, IMembershipService
    {
        private readonly IMembershipRepository _membershipRepository;
        private readonly IMapper _mapper;
        private readonly IInternalPersonService _internalPersonService;
        private readonly IEmailService _emailService;

        public MembershipService(IMembershipRepository membershipRepository, IMapper mapper, IInternalPersonService internalPersonService, IEmailService emailService) : base(membershipRepository, mapper)
        {
            _mapper = mapper;
            _membershipRepository = membershipRepository;
            _internalPersonService = internalPersonService;
            _emailService = emailService;
        }

        public async Task DeleteAllByAdmin(ClubDto clubDto)
        {
            try
            {
                List<string> emails = new List<string>();

                foreach (MembershipDto m in clubDto.Memberships)
                {
                    PersonDto personDto = _internalPersonService.GetByUserId((int)m.MemberId).Value;
                    emails.Add(personDto.Email);

                    _membershipRepository.Delete(m.Id);
                    _membershipRepository.SaveChanges();
                }
                PersonDto ownerDto = _internalPersonService.GetByUserId((int)clubDto.OwnerId).Value;
                emails.Add(ownerDto.Email);
                await _emailService.SendDeletionEmailsAsync(clubDto, emails);
            }
            catch (ArgumentException e)
            {
                Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<long>> GetClubIdListByStudentId(long studentId)
        {
            try
            {                
                return _membershipRepository.GetClubIdsByStudentId(studentId);
            }
            catch(ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<List<long>> GetMemberIdListByClubId(int clubId)
        {
            try
            {
                var members = _membershipRepository.GetPaged(0, 0).Results;
                var memberIds = members
                                .Where(m => m.ClubId == clubId)
                                .Select(m => m.MemberId)
                                .ToList();

                return memberIds;
            }
            catch(ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<MembershipDto> LeaveClub(long membershipId)
        {
            try
            {
                Membership membership = _membershipRepository.Get(membershipId);
                membership.Leave();
                _membershipRepository.SaveChanges();
                return MapToDto(membership);
            }
            catch(ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<MembershipDto> MakeAMember(long membershipId)
        {
            try
            {
                Membership membership = _membershipRepository.Get(membershipId);
                membership.MakeAMember();
                _membershipRepository.SaveChanges();
                return MapToDto(membership);
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<MembershipDto> PromoteToClubAdmin(long membershipId)
        {
            try
            {
                Membership membership = _membershipRepository.Get(membershipId);
                membership.MakeAnAdmin();
                _membershipRepository.SaveChanges();
                return MapToDto(membership);
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }

        public Result<MembershipDto> SuspendMember(long membershipId)
        {
            try
            {
                Membership membership = _membershipRepository.Get(membershipId);
                membership.Suspend();
                _membershipRepository.SaveChanges();
                return MapToDto(membership);
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }
    }
}
