using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.AgendaService
{
    public interface IAgendaService
    {
        Task<Response<AgendaCriacaoDto>> CriarAgendamento(AgendaCriacaoDto agendaDTO);
        Task<Response<List<AgendaModel>>> VerificarCliente(string nome);
        Task<IActionResult> CancelarSolicitacao(int id);
        Task<Response<AgendaCriacaoDto>> EditarSolicitacao(AgendaCriacaoDto agendaDTO);
        Task<Response<AgendaCriacaoDto>> ListarAgendamentos(int id_barbeiro, string? data, string? cliente, bool? aprovados);
        Task<Response<AgendaStatusDTO>> AprovarReprovarAgendamento(AgendaStatusDTO agendaStatus);
    }
}

