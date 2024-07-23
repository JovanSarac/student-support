using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StudentSupport.Stakeholders.API.Internal;

namespace StudentSupport.Stakeholders.Core.UseCases
{
    public class PersonService : BaseService<PersonDto, Person>, IPersonService, IInternalPersonService
    {
        private readonly IPersonRepository _personRepository;
        
        public PersonService(IPersonRepository personRepository, IMapper mapper) : base(mapper)
        {
            _personRepository = personRepository;;
        }

        public Result<PersonDto> GetByUserId(int userId)
        {
            try
            {
                var result = _personRepository.GetByUserId(userId);
                return MapToDto(result);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<PersonDto> Update(PersonDto person)
        {
            try
            {
                var result = _personRepository.Update(MapToDomain(person));
                return MapToDto(result);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }
    }
}
