using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.UseCases;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/announcements")]
    public class AnnouncementController : BaseApiController
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpGet]
        public ActionResult<PagedResult<AnnouncementDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _announcementService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<AnnouncementDto> Get(int id)
        {
            var result = _announcementService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("all_by_club_id/{clubId:int}")]
        public ActionResult<PagedResult<AnnouncementDto>> GetAllByClubIdPaged([FromQuery] int page, [FromQuery] int pageSize, int clubId)
        {
            var result = _announcementService.GetAllByClubIdPaged(page, pageSize, clubId);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<AnnouncementDto> Create([FromBody] AnnouncementDto announcementDto)
        {
            var result = _announcementService.Create(announcementDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<AnnouncementDto> Update([FromBody] AnnouncementDto announcementDto)
        {
            var result = _announcementService.Update(announcementDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _announcementService.Delete(id);
            return CreateResponse(result);
        }
    }
}
