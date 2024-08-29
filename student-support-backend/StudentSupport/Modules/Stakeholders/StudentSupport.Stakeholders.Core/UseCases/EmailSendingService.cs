using StudentSupport.Stakeholders.API.Internal;
using StudentSupport.Stakeholders.API.Public;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.Core.UseCases
{
    public class EmailSendingService : IEmailSendingService
    {
        private readonly IPersonService _personService;

        public EmailSendingService(IPersonService personService)
        {
            _personService = personService;
        }

        public async Task SendVerificationEmail(long id, string token, string email)
        {
            var person = _personService.GetByUserId((int)id);

            MailMessage mail = new MailMessage("unstudent@outlook.com", person.Value.Email);

            mail.Subject = "Verifikacija e-mail adrese";
            mail.Body = $@"
            Poštovani/a {person.Value.Name} {person.Value.Surname},

            Hvala Vam što ste se registrovali na naš UNStudent portal. Da biste verifikovali svoju e-mail adresu {email}, molimo Vas da kliknete na link ispod:

            http://localhost:4200/verify-email?token={token}

            Iz bezbednosnih razloga, ovaj link će biti aktivan naredna 24 sata. Ako ne možete da koristite link, molimo Vas da ga kopirate i nalepite u adresnu traku Vašeg pretraživača.

             Hvala Vam što ste se pridružili našoj zajednici i što koristite UNStudent portal za podršku studentima.

            Srdačan pozdrav,
            UNStudent";


            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            await client.SendMailAsync(mail);
        }
    }
}
