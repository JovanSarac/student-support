using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.UseCases;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/participations")]
    public class ParticipationController : BaseApiController
    {
        private readonly IParticipationService _participationService;

        public ParticipationController(IParticipationService participationService)
        {
            _participationService = participationService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ParticipationDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _participationService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ParticipationDto> Get(int id)
        {
            var result = _participationService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<ParticipationDto> Create([FromBody] ParticipationDto participationDto)
        {
            var result = _participationService.Create(participationDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<List<ParticipationDto>> Update([FromBody] ParticipationDto participationDto)
        {
            var result = _participationService.Update(participationDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _participationService.Delete(id);
            return CreateResponse(result);
        }
    }
}
