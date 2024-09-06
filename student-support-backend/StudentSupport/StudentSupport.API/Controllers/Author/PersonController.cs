using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using System.Security.Claims;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/person")]
    public class PersonController : BaseApiController
    {
        private readonly IPersonService _personService;
        private readonly IMembershipService _membershipService;
        public PersonController(IPersonService personService, IMembershipService membershipService)
        {
            _personService = personService;
            _membershipService = membershipService;
        }

        [HttpGet("club_members/{clubId:int}")]
        public ActionResult<PagedResult<PersonDto>> GetAllMembersByClubId([FromQuery] int page, [FromQuery] int pageSize, int clubId)
        {
            var memberIds = _membershipService.GetMemberIdListByClubId(clubId);

            if (!memberIds.IsSuccess)
            {
                 CreateResponse(Result.Fail(FailureCode.NotFound));
            }

            var result = _personService.GetPeopleByIdsPaged(page, pageSize, memberIds.Value);
            
            return CreateResponse(result);
        }

        [HttpGet("{userId:int}")]
        public ActionResult<PersonDto> GetByUserId(int userId)
        {
            var result = _personService.GetByUserId(userId);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<PersonDto> Update([FromBody] PersonDto person)
        {
            var loggedInPersonId = User.FindFirst("personId")?.Value;

            if (loggedInPersonId != person.Id.ToString())
            {
                return Forbid();
            }
            var result = _personService.Update(person);
            return CreateResponse(result);
        }
    }
}
