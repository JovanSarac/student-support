using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.UseCases;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/reports")]
    public class ReportController : BaseApiController
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpPost]
        public ActionResult<ReportDto> Create([FromBody] ReportDto reportDto)
        {
            var result = _reportService.Create(reportDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ReportDto> Update([FromBody] ReportDto reportDto)
        {
            var result = _reportService.Update(reportDto);
            return CreateResponse(result);
        }
    }
}
