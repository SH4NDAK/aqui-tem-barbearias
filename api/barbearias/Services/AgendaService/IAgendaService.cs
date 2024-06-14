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
    }
}

