using StudentSupport.Clubs.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Public
{
    public interface IEmailService
    {
        Task SendJoiningEmailsAsync(ClubDto clubDto, string email);
        Task SendDeletionEmailsAsync(ClubDto clubDto, List<string> receiversEmails);
        Task SendArchivingEmailsAsync(ClubDto clubDto, List<string> receiversEmails);
        Task SendPublishingEmailsAsync(ClubDto clubDto, List<string> receiversEmails);
    }
}
