using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Public
{
    public interface IPersonService
    {
        Result<PersonDto> GetByUserId(int userId);
        Result<PersonDto> Update(PersonDto personDto);
        Result<PagedResult<PersonDto>> GetPeopleByIdsPaged(int page, int pageSize, List<long> memberIds);
    }
}
