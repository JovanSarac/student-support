using Microsoft.Extensions.Options;
using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace StudentSupport.Stakeholders.Core.Domain
{
    public class ContactMessage : Entity
    {
        public string SenderEmail { get; init; }
        public string SenderName { get; init; }
        public string SenderSurname { get; init; }
        public string MessageContent {  get; init; }
        public DateTime SentDate { get; init; }
        public bool IsRead {  get; init; }

        public ContactMessage(string senderEmail, string senderName, string senderSurname, string messageContent, DateTime sentDate, bool isRead)
        {
            SenderEmail = senderEmail;
            SenderName = senderName;
            SenderSurname = senderSurname;
            MessageContent = messageContent;
            SentDate = sentDate;
            IsRead = isRead;
            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(SenderEmail)) throw new ArgumentException("Invalid SenderEmail");
            if (string.IsNullOrWhiteSpace(SenderName)) throw new ArgumentException("Invalid SenderName");
            if (string.IsNullOrWhiteSpace(SenderSurname)) throw new ArgumentException("Invalid SenderSurname");
            if (string.IsNullOrWhiteSpace(MessageContent)) throw new ArgumentException("Invalid MessageContent");
        }
    }
}
