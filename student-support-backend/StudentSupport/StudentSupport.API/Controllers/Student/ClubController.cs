using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/clubs")]
    public class ClubController : BaseApiController
    {
        private readonly IClubService _clubService;

        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
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

        [HttpPost("search_clubs/{name?}")]
        public ActionResult<List<ClubDto>> GetClubsBySearchName([FromBody] List<ClubDto> clubDtos, string? name)
        {
            var result = _clubService.GetClubsBySearchName(clubDtos, name);
            return CreateResponse(result);
        }

        [HttpGet("joined_clubs/{studentId:int}")]
        public ActionResult<PagedResult<ClubDto>> GetJoinedClubs([FromQuery] int page, [FromQuery] int pageSize, int studentId)
        {
            var result = _clubService.GetJoinedClubsPaged(page, pageSize, studentId);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ClubDto> Get(int id)
        {
            var result = _clubService.Get(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubDto> Update([FromBody] ClubDto clubDto)
        {
            var result = _clubService.Update(clubDto);
            return CreateResponse(result);
        }

        [HttpPost("filter_categories")]
        public ActionResult<List<ClubDto>> GetClubsByCategories([FromBody] FilterCategoriesDto request)
        {
            var result = _clubService.GetClubsByCategories(request.ClubDtos, request.Categories);
            return CreateResponse(result);
        }
    }
}
