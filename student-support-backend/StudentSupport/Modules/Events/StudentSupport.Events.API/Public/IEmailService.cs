using FluentResults;
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
        Task SendEmailAsync(EventDto eventDto, string receiversMail);
        Task SendCancellationEmailsAsync(EventDto eventDto, List<string> receiversEmails);
        Task SendPublishedEmailsAsync(EventDto eventDto, List<string> receiversEmails);
        Task SendActivationEmailAsync(string username, int id, int role);
        Task SendDeactivationEmailAsync(string username, int id, int role);
    }
}
