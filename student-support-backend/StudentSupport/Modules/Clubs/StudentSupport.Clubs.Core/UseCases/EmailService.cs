using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Stakeholders.API.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class EmailService : IEmailService
    {
        private readonly IInternalPersonService _internalPersonService;

        public EmailService(IInternalPersonService internalPersonService)
        {
            _internalPersonService = internalPersonService;
        }

        public async Task SendJoiningEmailsAsync(ClubDto clubDto, string email)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            mail.To.Add(email);

            mail.Subject = clubDto.Name + " - Postali ste član kluba";
            mail.Body = "Obaveštavamo vas da ste zvanično postali član kluba " + clubDto.Name + ". Želimo vam ugodan nastavak korišćenja UNStudent-a.";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            await client.SendMailAsync(mail);
        }

        public async Task SendDeletionEmailsAsync(ClubDto clubDto, List<string> receiversEmails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            foreach (string email in receiversEmails)
            {
                mail.To.Add(email);
            }

            mail.Subject = clubDto.Name + " - Banovan klub";
            mail.Body = "Obaveštavamo vas da je klub " + clubDto.Name + " čiji ste član banovan jer je kršio naše uslove korišćenja. Dalji pristup klubu neće biti moguć. Izvinjavamo se zbog eventualnih neugodnosti.";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            await client.SendMailAsync(mail);
        }

        public async Task SendArchivingEmailsAsync(ClubDto clubDto, List<string> receiversEmails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            foreach (string email in receiversEmails)
            {
                mail.To.Add(email);
            }

            mail.Subject = clubDto.Name + " - Privremeno zatvoren klub";
            mail.Body = "Obaveštavamo vas da je klub " + clubDto.Name + " čiji ste član trenutno nedostupan jer ga je vlasnik/administrator privremeno ugasio. Dalji pristup klubu neće biti moguć dok vlasnik to ne dozvoli. Izvinjavamo se zbog eventualnih neugodnosti.";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            await client.SendMailAsync(mail);
        }

        public async Task SendPublishingEmailsAsync(ClubDto clubDto, List<string> receiversEmails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            foreach (string email in receiversEmails)
            {
                mail.To.Add(email);
            }

            mail.Subject = clubDto.Name + " - Ponovo aktivan klub";
            mail.Body = "Obaveštavamo vas da je klub " + clubDto.Name + " čiji ste član ponovo dostupan jer ga je vlasnik opet aktivirao. Sada imate ponovo pristup klubu. Izvinjavamo se zbog eventualnih neugodnosti.";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            await client.SendMailAsync(mail);
        }
    }
}
