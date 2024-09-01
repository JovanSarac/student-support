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
    public interface IContactMessageService
    {
        Result<PagedResult<ContactMessageDto>> GetPaged(int page, int pageSize);
        Result<ContactMessageDto> Create(ContactMessageDto messageDto);
        Result<ContactMessageDto> Update(ContactMessageDto messageDto);
        Result Delete(int id);
        Result<ContactMessageDto> Get(int id);
    }
}
