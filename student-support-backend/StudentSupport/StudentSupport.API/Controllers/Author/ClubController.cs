using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/clubs")]
    public class ClubController : BaseApiController
    {
        private readonly IClubService _clubService;
        private readonly IEmailService _emailService;
        private readonly IPersonService _personService;

        public ClubController(IClubService clubService, IEmailService emailService, IPersonService personService)
        {
            _clubService = clubService;
            _emailService = emailService;
            _personService = personService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ClubDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _clubService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("active_clubs")]
        public ActionResult<PagedResult<ClubDto>> GetAllActiveClubs([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _clubService.GetAllActiveClubs(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("created_clubs/{authorId:int}")]
        public ActionResult<PagedResult<ClubDto>> GetCreatedClubs([FromQuery] int page, [FromQuery] int pageSize, int authorId)
        {
            var result = _clubService.GetCreatedClubsPaged(page, pageSize, authorId);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ClubDto> Get(int id)
        {
            var result = _clubService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<ClubDto> Create([FromBody] ClubDto clubDto)
        {
            var result = _clubService.Create(clubDto);
            return CreateResponse(result);
        }

        [HttpGet("is_author_of_club/{clubId:int}/{authorId:int}")]
        public ActionResult<bool> IsAuthorOfClub(int clubId, int authorId)
        {
            var result = _clubService.IsAuthorOfClub(authorId, clubId);
            return CreateResponse(result);
        }

        [HttpPut("close")]
        public ActionResult<ClubDto> CloseClub([FromBody] int id)
        {
            var result = _clubService.CloseClub(id);

            var members = _personService.GetPeopleByIdsPaged(0,0, result.Value.Memberships.Select(m => m.MemberId).ToList()).Value;

            if (result.IsSuccess)
            {
                _emailService.SendArchivingEmailsAsync(result.Value, members.Results.Select(p => p.Email).ToList());
            }

            return CreateResponse(result);
        }

        [HttpPut("activate")]
        public ActionResult<ClubDto> ActivateClub([FromBody] int id)
        {
            var result = _clubService.ActivateClub(id);

            var members = _personService.GetPeopleByIdsPaged(0, 0, result.Value.Memberships.Select(m => m.MemberId).ToList()).Value;

            if (result.IsSuccess)
            {
                _emailService.SendPublishingEmailsAsync(result.Value, members.Results.Select(p => p.Email).ToList());
            }

            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubDto> Update([FromBody] ClubDto clubDto)
        {
            var result = _clubService.Update(clubDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _clubService.Delete(id);
            return CreateResponse(result);
        }

    }
}
