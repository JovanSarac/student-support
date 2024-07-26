using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Public
{
    public interface IParticipationService
    {
        Result<PagedResult<ParticipationDto>> GetPaged(int page, int pageSize);
        Result<ParticipationDto> Get(int id);
        Result<ParticipationDto> Create(ParticipationDto participationDto);
        Result<ParticipationDto> Update(ParticipationDto participationDto);
        Result Delete(int id);
        Result<List<ParticipationDto>> GetAllByStudentId(int studentId);
        Result<ParticipationDto> Cancel(int id);
        Task<Result<ParticipationDto>> CreateWithEmail(ParticipationDto participationDto);
        Result<int> CountParticipationsByEventId(int eventId);
    }
}
