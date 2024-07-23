using StudentSupport.Events.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Public
{
    public interface IEmailService
    {
        Task SendEmailAsync(ParticipationDto participationDto, EventDto eventDto/*, string receiversMail*/);
    }
}
