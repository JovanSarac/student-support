﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;

namespace StudentSupport.API.Controllers.Admin
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/memberships")]
    public class MembershipController : BaseApiController
    {
        private readonly IMembershipService _membershipService;

        public MembershipController(IMembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        [HttpGet]
        public ActionResult<PagedResult<MembershipDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _membershipService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<MembershipDto> Get(int id)
        {
            var result = _membershipService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<MembershipDto> Create([FromBody] MembershipDto membershipDto)
        {
            var result = _membershipService.Create(membershipDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<ClubDto> Update([FromBody] MembershipDto membershipDto)
        {
            var result = _membershipService.Update(membershipDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _membershipService.Delete(id);
            return CreateResponse(result);
        }
    }
}
