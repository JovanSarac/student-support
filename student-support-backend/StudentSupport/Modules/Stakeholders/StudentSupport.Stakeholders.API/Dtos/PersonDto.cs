using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Dtos
{
    public class PersonDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string? ProfilePic { get; set; }
        public DateOnly RegistrationDate { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly? BirthDate { get; set; }
        public string? Biography { get; set; }
    }
}
