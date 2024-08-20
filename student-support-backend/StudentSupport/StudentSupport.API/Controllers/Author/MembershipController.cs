using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/memberships")]
    public class MembershipController : BaseApiController
    {
        private readonly IMembershipService _membershipService;

        public MembershipController(IMembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        [HttpGet]
        public ActionResult<PagedResult<MembershipDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _membershipService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<MembershipDto> Get(int id)
        {
            var result = _membershipService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<MembershipDto> Create([FromBody] MembershipDto membershipDto)
        {
            var result = _membershipService.Create(membershipDto);
            return CreateResponse(result);
        }

        [HttpPut("suspend")]
        public ActionResult<MembershipDto> SuspendMembership([FromBody] int id)
        {
            var result = _membershipService.SuspendMember(id);
            return CreateResponse(result);
        }

        [HttpPut("promote_to_club_admin")]
        public ActionResult<MembershipDto> PromoteToClubAdmin([FromBody] int id)
        {
            var result = _membershipService.PromoteToClubAdmin(id);
            return CreateResponse(result);
        }

        [HttpPut("make_a_member")]
        public ActionResult<MembershipDto> MakeAMember([FromBody] int id)
        {
            var result = _membershipService.MakeAMember(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubDto> Update([FromBody] MembershipDto membershipDto)
        {
            var result = _membershipService.Update(membershipDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _membershipService.Delete(id);
            return CreateResponse(result);
        }
    }
}
