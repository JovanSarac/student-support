using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/events")]
    public class EventController  : BaseApiController
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpPost]
        public ActionResult<EventDto> Create([FromBody] EventDto eventDto)
        {
            var result = _eventService.Create(eventDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<List<EventDto>> Update([FromBody] EventDto eventDto)
        {
            var result = _eventService.Update(eventDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _eventService.Delete(id);
            return CreateResponse(result);
        }
    }
}
