using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Dtos
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public int Role { get; private set; }
        public bool IsActive { get; set; }
        public bool RegisterWithEmail { get; set; }
    }
}
