using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Dtos
{
    public class ClubReportDto
    {
        public long Id { get; set; }
        public long ClubId { get; set; }
        public long StudentId { get; set; }
        public DateTime Date { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
    }
}
