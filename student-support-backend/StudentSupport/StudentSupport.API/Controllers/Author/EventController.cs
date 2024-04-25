using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/events")]
    public class EventController : BaseApiController
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<EventDto> Create([FromBody] EventDto eventDto)
        {
            var result = _eventService.Create(eventDto);
            return CreateResponse(result);
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<PagedResult<EventDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }
        [AllowAnonymous]
        [HttpPut]
        public ActionResult<List<EventDto>> Update([FromBody] EventDto eventDto)
        {
            var result = _eventService.Update(eventDto);
            return CreateResponse(result);
        }
        [AllowAnonymous]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _eventService.Delete(id);
            return CreateResponse(result);
        }

    }
}
