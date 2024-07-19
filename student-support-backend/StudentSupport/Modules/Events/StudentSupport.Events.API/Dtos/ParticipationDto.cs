using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Dtos
{
    public class ParticipationDto
    {
        public long Id { get; set; }
        public long EventId { get; set; }
        public long StudentId { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Type { get; set; }
    }
}
