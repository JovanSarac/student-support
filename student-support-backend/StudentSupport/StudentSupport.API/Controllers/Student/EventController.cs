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

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<PagedResult<EventDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<EventDto> Get(int id)
        {
            var result = _eventService.Get(id);
            return CreateResponse(result);
        }

    }
}
