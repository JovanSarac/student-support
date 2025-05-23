﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.UseCases;
using StudentSupport.Stakeholders.Core.Domain;
using System.Security.Claims;

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

        [HttpGet("by_student_id/{studentId:int}")]
        public ActionResult<PagedResult<ParticipationDto>> GetAllByStudentId(int studentId)
        {
            var result = _participationService.GetAllByStudentId(studentId);
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
            var loggedInUserId = User.FindFirst("id")?.Value;

            if (loggedInUserId != participationDto.StudentId.ToString())
            {
                return Forbid();
            }
            var result = _participationService.CreateWithEmail(participationDto);
            return CreateResponse(result.Result);
        }

        [HttpPut]
        public ActionResult<ParticipationDto> Update([FromBody] ParticipationDto participationDto)
        {
            var loggedInUserId = User.FindFirst("id")?.Value;

            if (loggedInUserId != participationDto.StudentId.ToString())
            {
                return Forbid();
            }
            var result = _participationService.Update(participationDto);
            return CreateResponse(result);
        }

        [HttpPut("cancel")]
        public ActionResult<ParticipationDto> CancelParticipation([FromBody] int id)
        {
            var result = _participationService.Cancel(id);
            return CreateResponse(result);
        }

        [HttpGet("count/{eventId:int}")]
        public ActionResult<PagedResult<ParticipationDto>> CountByEventId(int eventId)
        {
            var result = _participationService.CountParticipationsByEventId(eventId);
            return CreateResponse(result);
        }

        [HttpPost("resend_email/{eventId:int}/{studentId:int}")]
        public async Task<ActionResult> ResendMail(int eventId, int studentId)
        {
            var result = await _participationService.ResendMail(eventId, studentId);
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
