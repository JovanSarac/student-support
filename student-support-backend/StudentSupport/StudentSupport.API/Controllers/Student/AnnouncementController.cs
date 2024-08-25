using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/announcements")]
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

        [HttpPut]
        public ActionResult<AnnouncementDto> Update([FromBody] AnnouncementDto announcementDto)
        {
            var result = _announcementService.Update(announcementDto);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<AnnouncementDto> Create([FromBody] AnnouncementDto announcementDto)
        {
            var result = _announcementService.Create(announcementDto);
            return CreateResponse(result);
        }

        [HttpDelete("{announcementId:int}")]
        public ActionResult Delete(int announcementId)
        {
            var result = _announcementService.Delete(announcementId);
            return CreateResponse(result);
        }
    }
}
