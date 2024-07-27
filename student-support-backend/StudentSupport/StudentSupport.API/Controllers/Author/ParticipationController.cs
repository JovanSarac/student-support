using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/participations")]
    public class ParticipationController :  BaseApiController
    {
        private readonly IParticipationService _participationService;

        public ParticipationController(IParticipationService participationService)
        {
            _participationService = participationService;
        }

        [HttpGet("count/{eventId:int}")]
        public ActionResult<PagedResult<ParticipationDto>> CountByEventId(int eventId)
        {
            var result = _participationService.CountParticipationsByEventId(eventId);
            return CreateResponse(result);
        }
    }
}
