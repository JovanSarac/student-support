using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;

namespace StudentSupport.API.Controllers
{
    [Route("api/anonymus/events")]
    public class EventController: BaseApiController
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("get_random_four_events")]
        public ActionResult<List<EventDto>> GetRandomFourEvents()
        {
            var result = _eventService.GetRandomFourEvents();
            return CreateResponse(result);
        }
    }
}
