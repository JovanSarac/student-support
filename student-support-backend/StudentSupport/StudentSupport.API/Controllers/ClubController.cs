using Microsoft.AspNetCore.Mvc;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers
{
    [Route("api/anonymus/clubs")]
    public class ClubController : BaseApiController
    {
        private readonly IClubService _clubService;
        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
        }

        [HttpGet("get_mostpopular_two_clubs")]
        public ActionResult<List<ClubDto>> GetMostPopularTwoClubs()
        {
            var result = _clubService.GetMostPopularTwoClubs();
            return CreateResponse(result);
        }
    }
}
