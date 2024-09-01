using AutoMapper;
using Microsoft.Extensions.Logging;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using StudentSupport.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.Core.UseCases
{
    public class ContactMessageService : CrudService<ContactMessageDto, ContactMessage>, IContactMessageService
    {

        public ContactMessageService(ICrudRepository<ContactMessage> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
