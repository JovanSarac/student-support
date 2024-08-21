using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.UseCases;

namespace StudentSupport.API.Controllers.Admin
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/reports")]
    public class ReportController : BaseApiController
    {
        private readonly IReportService _reportService;
        private readonly IEventService _eventService;
        private readonly IParticipationService _participationService;

        public ReportController(IReportService reportService, IEventService eventService, IParticipationService participationService)
        {
            _reportService = reportService;
            _eventService = eventService;
            _participationService = participationService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ReportDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _reportService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ReportDto> Get(int id)
        {
            var result = _reportService.Get(id);
            return CreateResponse(result);
        }

        [HttpPut("resolve")]
        public ActionResult<ReportDto> ResolveReport([FromBody] int id)
        {
            var report = _reportService.Get(id);
            if(report.Value != null)
            {
                var eventTemp = _eventService.Get((int)report.Value.EventId).Value;
                var eventResult = _eventService.Delete((int)report.Value.EventId);

                if (eventResult.IsFailed)
                {
                    return CreateResponse(Result.Fail(FailureCode.InvalidArgument));
                }

                _participationService.CancelAllByAdmin(eventTemp);
            }

            var result = _reportService.Resolve(id);
            return CreateResponse(result);
        }

        [HttpPut("dismiss")]
        public ActionResult<ReportDto> DismissReport([FromBody] int id)
        {
            var result = _reportService.Dismiss(id);
            return CreateResponse(result);
        }

        [HttpPut("close")]
        public ActionResult<ReportDto> CloseReport([FromBody] int id)
        {
            var result = _reportService.Close(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ReportDto> Update([FromBody] ReportDto reportDto)
        {
            var result = _reportService.Update(reportDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _reportService.Delete(id);
            return CreateResponse(result);
        }
    }
}
