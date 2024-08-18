using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers.Admin
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/clubs")]
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
