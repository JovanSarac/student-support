using FluentResults;
using StudentSupport.Stakeholders.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Public
{
    public interface IUserService
    {
        Result<UserDto> GetByUserId(int userId);
        Result<UserDto> ActivateUser(int userId);
    }
}
