using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.Domain
{
    public class Report : Entity
    {
        public long EventId { get; set; }
        public long StudentId { get; set; }
        public DateTime Date{ get; set; }
        public ReportType Type { get; set; }
        public ReportStatus Status { get; set; }

        public Report() { }

        public Report(long eventId, long studentId, DateTime date, ReportType type, ReportStatus status)
        {
            EventId = eventId;
            StudentId = studentId;
            Date = date;
            Type = type;
            Status = status;

            Validate();
        }

        private void Validate()
        {
            if (EventId == 0) { throw new ArgumentNullException("EventId can't be 0."); }
            if (StudentId == 0) { throw new ArgumentNullException("StudentId can't be 0."); }
        }

        public void Resolve()
        {
            Validate();
            Status = ReportStatus.Resolved;
        }

        public void Dismiss()
        {
            Validate();
            Status = ReportStatus.Dismissed;
        }

        public void Close()
        {
            Validate();
            Status = ReportStatus.Closed;
        }
    }

    public enum ReportType
    {
        Harassment,
        Nudity,
        Spam,
        FraudOrScam,
        Fake,
        Violence,
        HateSpeech
    }

    public enum ReportStatus
    {
        Pending,
        Resolved,
        Dismissed,
        Closed
    }
}
