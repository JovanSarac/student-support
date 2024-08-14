using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/events")]
    public class EventController : BaseApiController
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public ActionResult<PagedResult<EventDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("get_all_incoming_events")]
        public ActionResult<PagedResult<EventDto>> GetAllIncomingEvents([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetIncomingEventsPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<EventDto> Get(int id)
        {
            var result = _eventService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("get_yours_participate_events/{student_id:int}")]
        public ActionResult<List<EventDto>> GetYoursEvents(int student_id)
        {
            var result = _eventService.GetYoursParticipateEvents(student_id);
            return CreateResponse(result);
        }

    }
}
