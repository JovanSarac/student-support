using Microsoft.Extensions.Logging;
using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain
{
    public class ClubReport : Entity
    {
        public long ClubId { get; set; }
        public long StudentId { get; set; }
        public DateTime Date { get; set; }
        public ReportType Type { get; set; }
        public ReportStatus Status { get; set; }

        public ClubReport() { }

        public ClubReport(long clubId, long studentId, DateTime date, ReportType type, ReportStatus status)
        {
            ClubId = clubId;
            StudentId = studentId;
            Date = date;
            Type = type;
            Status = status;

            Validate();
        }

        private void Validate()
        {
            if (ClubId == 0) { throw new ArgumentNullException("EventId can't be 0."); }
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
