using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.Domain
{
    public class Participation : Entity
    {
        public long EventId { get; set; }
        public long StudentId{ get; set; }
        public DateTime EnrollmentDate { get; set; }
        public ParticipationType Type { get; set; }

        public Participation()
        {
            
        }

        public Participation(long eventId, long studentId)
        {
            EventId = eventId;
            StudentId = studentId;
            EnrollmentDate = DateTime.Now;
            Type = ParticipationType.Active;

            Validate();
        }

        private void Validate()
        {
            if (EventId == 0) { throw new ArgumentNullException("EventId can't be 0."); }
            if (StudentId == 0) { throw new ArgumentNullException("StudentId can't be 0."); }
        }

        public void Cancel()
        {
            Validate();
            Type = ParticipationType.Cancelled;
        }

        public void Enroll()
        {
            Validate();
            Type = ParticipationType.Active;
        }
    }

    public enum ParticipationType
    {
        Active,
        Cancelled
    }
}
