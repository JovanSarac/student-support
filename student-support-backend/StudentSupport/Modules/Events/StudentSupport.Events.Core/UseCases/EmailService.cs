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

        public void SendEmail(ParticipationDto participationDto, EventDto eventDto, string receiversMail)
        {
            string htmlBody = $@"
                <html>
                <head>
                    <style>
                        .event-container {{
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                            max-width: 600px;
                        }}
                        .event-header {{
                            background-color: #5271ff;
                            padding: 10px;
                            border-bottom: 1px solid #ccc;
                        }}
                        .event-body {{
                            padding: 10px;
                        }}
                        .event-title {{
                            font-size: 20px;
                            font-weight: bold;
                            color: #ffffff;
                        }}
                        .event-detail {{
                            margin-top: 10px;
                            font-size: 14px;
                        }}
                        .event-link {{
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 15px;
                            border-color: #4285F4;
                            border-radius: 5px;
                        }}
                    </style>
                </head>
                <body>
                    <div class='event-container'>
                        <div class='event-header'>
                            <div class='event-title'>{eventDto.Name}</div>
                        </div>
                        <div class='event-body'>
                            <div class='event-detail'><strong>Opis:</strong> {eventDto.Description}</div>
                            <div class='event-detail'><strong>Datum i vreme:</strong> {eventDto.DateEvent:dd.MM.yyyy. HH:mm}</div>
                            <div class='event-detail'><strong>Lokacija:</strong> {eventDto.Address}</div>
                            <a href='https://www.google.com/calendar/render?action=TEMPLATE&text={Uri.EscapeDataString(eventDto.Name)}&dates={eventDto.DateEvent:yyyyMMddTHHmmssZ}/{eventDto.DateEvent.AddHours(1):yyyyMMddTHHmmssZ}&details={Uri.EscapeDataString(eventDto.Description)}&location={Uri.EscapeDataString(eventDto.Address)}' class='event-link'>Dodaj u Google Kalendar</a>
                        </div>
                    </div>
                </body>
                </html>";

            MailMessage mail = new MailMessage("unstudent@outlook.com", receiversMail);
            mail.Subject = "Dodajte događaj u svoj Google Kalendar";
            mail.Body = htmlBody;
            mail.IsBodyHtml = true;

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
            client.Credentials = new NetworkCredential("unstudent@outlook.com", "Studentskidogadjaji021!");
            client.EnableSsl = true;

            client.Send(mail);
        }
    }
}
