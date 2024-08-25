using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Events.API.Dtos;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/clubReports")]
    public class ClubReportController : BaseApiController
    {
        private readonly IClubReportService _clubReportService;
        private readonly IClubService _clubService;
        private readonly IMembershipService _membershipService;

        public ClubReportController(IClubReportService clubReportService, IClubService clubService, IMembershipService membershipService)
        {
            _clubReportService= clubReportService;
            _clubService= clubService;
            _membershipService= membershipService;
        }

        [HttpPost]
        public ActionResult<ClubReportDto> Create([FromBody] ClubReportDto reportDto)
        {
            var result = _clubReportService.Create(reportDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubReportDto> Update([FromBody] ClubReportDto reportDto)
        {
            var result = _clubReportService.Update(reportDto);
            return CreateResponse(result);
        }
    }
}
