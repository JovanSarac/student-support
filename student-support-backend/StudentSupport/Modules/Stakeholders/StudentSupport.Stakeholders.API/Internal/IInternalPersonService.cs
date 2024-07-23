using FluentResults;
using StudentSupport.Stakeholders.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Internal
{
    public interface IInternalPersonService
    {
        Result<PersonDto> GetByUserId(int userId);
    }
}
