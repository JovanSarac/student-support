using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers.Student
{
    [Authorize(Policy = "studentPolicy")]
    [Route("api/student/person")]
    public class PersonController : BaseApiController
    {
        private readonly IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet("{userId:int}")]
        public ActionResult<PersonDto> GetByUserId(int userId)
        {
            var result = _personService.GetByUserId(userId);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<PersonDto> Update([FromBody] PersonDto person)
        {
            var result = _personService.Update(person);
            return CreateResponse(result);
        }
    }
}
