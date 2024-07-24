using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Dtos
{
    public class AccountRegistrationGmailDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string ProfilePic { get; set; }
    }
}
