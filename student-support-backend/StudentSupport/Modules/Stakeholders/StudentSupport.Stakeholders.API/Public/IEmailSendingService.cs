using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Public
{
    public interface IEmailSendingService
    {
        Task SendVerificationEmail(long id, string token, string email);
    }
}
