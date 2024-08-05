using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.UseCases
{
    public class EmailService : IEmailService
    {

        public async Task SendEmailAsync(EventDto eventDto, string receiversMail)
        {
            MailMessage mail = new MailMessage("unstudent@outlook.com", receiversMail);
            
            mail.Subject = eventDto.Name;
            mail.Body = "Hvala vam što ste se prijavili za učešće u našem događaju putem sajta UNStudent! ";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            StringBuilder str = new StringBuilder();
            str.AppendLine("BEGIN:VCALENDAR");
            str.AppendLine("PRODID:-//GeO");
            str.AppendLine("VERSION:2.0");
            str.AppendLine("METHOD:REQUEST");
            str.AppendLine("BEGIN:VEVENT");
            str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent));
            str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
            str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent.AddHours(1))); //ovo cemo promeniti kada dodje do dodavanja durationa
            str.AppendLine("LOCATION: " + eventDto.Address);
            str.AppendLine(string.Format("UID:{0}", Guid.NewGuid()));
            //str.AppendLine(string.Format("DESCRIPTION:{0}", msg.Body));
            str.AppendLine(string.Format("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:{0}", eventDto.Description));

            str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", mail.Body));
            str.AppendLine(string.Format("SUMMARY;ENCODING=QUOTED-PRINTABLE:{0}", mail.Subject));
            str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", mail.From.Address));

            str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", mail.To[0].DisplayName, mail.To[0].Address));

            str.AppendLine("BEGIN:VALARM");
            str.AppendLine("TRIGGER:-PT15M");
            str.AppendLine("ACTION:DISPLAY");
            str.AppendLine("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:Reminder");
            str.AppendLine("END:VALARM");
            str.AppendLine("END:VEVENT");
            str.AppendLine("END:VCALENDAR");
            System.Net.Mime.ContentType type = new System.Net.Mime.ContentType("text/calendar");
            type.Parameters.Add("method", "REQUEST");
            //type.Parameters.Add("method", "PUBLISH");
            type.Parameters.Add("name", "Cita.ics");
            mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(str.ToString(), type));

            await client.SendMailAsync(mail);
        }

        public async Task SendCancellationEmailsAsync(EventDto eventDto, List<string> receiversEmails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            foreach (string email in receiversEmails)
            {
                mail.To.Add(email);
            }

            mail.Subject = eventDto.Name + " - Otkazan događaj";
            mail.Body = "Obaveštavamo vas da je događaj " + eventDto.Name + " na koji ste se prijavili otkazan. Izvinjavamo se zbog eventualnih neugodnosti.";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            StringBuilder str = new StringBuilder();
            str.AppendLine("BEGIN:VCALENDAR");
            str.AppendLine("PRODID:-//GeO");
            str.AppendLine("VERSION:2.0");
            str.AppendLine("METHOD:CANCEL");
            str.AppendLine("BEGIN:VEVENT");
            str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent));
            str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
            str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent.AddHours(1)));
            str.AppendLine("LOCATION: " + eventDto.Address);
            str.AppendLine(string.Format("UID:{0}", Guid.NewGuid()));
            str.AppendLine(string.Format("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:{0}", "Ovaj događaj je otkazan."));
            str.AppendLine(string.Format("SUMMARY;ENCODING=QUOTED-PRINTABLE:{0}", mail.Subject));
            str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", mail.From.Address));

            foreach (string email in receiversEmails)
            {
                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", email, email));
            }

            str.AppendLine("BEGIN:VALARM");
            str.AppendLine("TRIGGER:-PT15M");
            str.AppendLine("ACTION:DISPLAY");
            str.AppendLine("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:Reminder");
            str.AppendLine("END:VALARM");
            str.AppendLine("END:VEVENT");
            str.AppendLine("END:VCALENDAR");

            System.Net.Mime.ContentType type = new System.Net.Mime.ContentType("text/calendar");
            type.Parameters.Add("method", "CANCEL");
            type.Parameters.Add("name", "Cancel.ics");
            mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(str.ToString(), type));

            await client.SendMailAsync(mail);
        }

        public async Task SendPublishedEmailsAsync(EventDto eventDto, List<string> receiversEmails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("unstudent@outlook.com");

            foreach (string email in receiversEmails)
            {
                mail.To.Add(email);
            }

            mail.Subject = eventDto.Name + " - Ponovo aktivan događaj!";
            mail.Body = "Otkazani događaj koji ste označili kao zanimljiv je ponovo aktivan, da li ste i dalje zainteresovani da učestvujete u ovom događaju?";

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            StringBuilder str = new StringBuilder();
            str.AppendLine("BEGIN:VCALENDAR");
            str.AppendLine("PRODID:-//GeO");
            str.AppendLine("VERSION:2.0");
            str.AppendLine("METHOD:REQUEST");
            str.AppendLine("BEGIN:VEVENT");
            str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent));
            str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
            str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", eventDto.DateEvent.AddHours(1)));
            str.AppendLine("LOCATION: " + eventDto.Address);
            str.AppendLine(string.Format("UID:{0}", Guid.NewGuid()));
            str.AppendLine(string.Format("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:{0}", eventDto.Description));
            str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", mail.Body));
            str.AppendLine(string.Format("SUMMARY;ENCODING=QUOTED-PRINTABLE:{0}", mail.Subject));
            str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", mail.From.Address));

            foreach (string email in receiversEmails)
            {
                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", email, email));
            }

            str.AppendLine("BEGIN:VALARM");
            str.AppendLine("TRIGGER:-PT15M");
            str.AppendLine("ACTION:DISPLAY");
            str.AppendLine("DESCRIPTION;ENCODING=QUOTED-PRINTABLE:Reminder");
            str.AppendLine("END:VALARM");
            str.AppendLine("END:VEVENT");
            str.AppendLine("END:VCALENDAR");

            System.Net.Mime.ContentType type = new System.Net.Mime.ContentType("text/calendar");
            type.Parameters.Add("method", "REQUEST");
            type.Parameters.Add("name", "Cita.ics");
            mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(str.ToString(), type));

            await client.SendMailAsync(mail);
        }



    }
}
