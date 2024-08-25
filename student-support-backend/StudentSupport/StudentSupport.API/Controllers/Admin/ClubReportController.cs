using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers.Admin
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/clubReports")]
    public class ClubReportController : BaseApiController
    {
        private readonly IClubReportService _clubReportService;
        private readonly IClubService _clubService;
        private readonly IMembershipService _membershipService;
        private readonly IEmailService _emailService;
        private readonly IPersonService _personService;

        public ClubReportController(IClubReportService clubReportService, IClubService clubService, IMembershipService membershipService, IPersonService personService, IEmailService emailService)
        {
            _clubReportService= clubReportService;
            _clubService= clubService;
            _membershipService= membershipService;
            _personService = personService;
            _emailService = emailService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ClubReportDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _clubReportService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ClubReportDto> Get(int id)
        {
            var result = _clubReportService.Get(id);
            return CreateResponse(result);
        }

        [HttpPut("resolve")]
        public ActionResult<ClubReportDto> ResolveReport([FromBody] int id)
        {
            var report = _clubReportService.Get(id);
            if (report.Value != null)
            {
                var club = _clubService.Get((int)report.Value.ClubId).Value;
                var clubResult = _clubService.Delete((int)report.Value.ClubId);

                if (clubResult.IsFailed)
                {
                    return CreateResponse(Result.Fail(FailureCode.InvalidArgument));
                }

                var members = _personService.GetPeopleByIdsPaged(0, 0, club.Memberships.Select(m => m.MemberId).ToList()).Value;

                if (clubResult.IsSuccess)
                {
                    if(members.TotalCount > 0)
                    {
                        _emailService.SendDeletionEmailsAsync(club, members.Results.Select(p => p.Email).ToList());
                    }
                }

                _membershipService.DeleteAllByAdmin(club);
                _clubReportService.ResolveAllByClubId((int)club.Id);
            }

            var result = _clubReportService.Resolve(id);

            return CreateResponse(result);
        }

        [HttpPut("dismiss")]
        public ActionResult<ClubReportDto> DismissReport([FromBody] int id)
        {
            var result = _clubReportService.Dismiss(id);
            return CreateResponse(result);
        }

        [HttpPut("close")]
        public ActionResult<ClubReportDto> CloseReport([FromBody] int id)
        {
            var result = _clubReportService.Close(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubReportDto> Update([FromBody] ClubReportDto reportDto)
        {
            var result = _clubReportService.Update(reportDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _clubReportService.Delete(id);
            return CreateResponse(result);
        }
    }
}
