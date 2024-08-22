using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace StudentSupport.Clubs.Core.Domain
{
    public class Announcement : Entity
    {
        public long ClubId { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Content { get; set; }
        public long AnnouncerId { get; set; }
        public List<byte[]> Images { get; init; }
        
        public Announcement()
        {
            Images = new List<byte[]>();
            Content = "";
        }

        public Announcement(long clubId, DateTime publicationDate, string content, long announcerId, List<byte[]> images)
        {
            ClubId = clubId;
            PublicationDate = publicationDate;
            Content = content;
            AnnouncerId = announcerId;
            Images = images ?? new List<byte[]>();

            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Content)) throw new ArgumentException("Content can't be empty.");
            if (ClubId == 0) throw new ArgumentException("ClubId can't be 0.");
            if (AnnouncerId == 0) throw new ArgumentException("ClubId can't be 0.");
        }
    }
}
