using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.API.Dtos
{
    public class FilterCategoriesDto
    {
        public List<ClubDto> ClubDtos { get; set; }
        public List<string> Categories { get; set; }
    }
}
