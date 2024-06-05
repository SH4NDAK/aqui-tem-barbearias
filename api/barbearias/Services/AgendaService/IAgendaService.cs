using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.AgendaService
{
    public interface IAgendaService
    {
        Task<Response<AgendaCriacaoDto>> CriarAgendamento(AgendaCriacaoDto agendaDTO);
        Task<Response<List<AgendaCriacaoDto>>> ListarAgendamentos(int cargo, int id);
        Task<Response<AgendaCriacaoDto>> EditarAgendamento(int id, AgendaCriacaoDto agendaAtualizacaoDto);
    }
}

