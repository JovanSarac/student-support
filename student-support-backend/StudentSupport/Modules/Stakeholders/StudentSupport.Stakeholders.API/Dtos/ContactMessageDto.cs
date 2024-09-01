using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.API.Dtos
{
    public class ContactMessageDto
    {
        public long Id { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string SenderSurname { get; set; }
        public string MessageContent { get; set; }
        public DateTime SentDate { get; set; }
        public bool IsRead { get; set; }
    }
}
