using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.AgendaService;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        private readonly IAgendaService _agendaService;

        public AgendaController(IAgendaService agendaService)
        {
            _agendaService = agendaService;
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> CadastrarAgenda(AgendaCriacaoDto agendaDTO)
        {
            var response = await _agendaService.CriarAgendamento(agendaDTO);

            if (response.Status == 405)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("verificar/{nome}")]
        public async Task<IActionResult> VerificarCliente(string nome)
        {
            var response = await _agendaService.VerificarCliente(nome);

            if (response == null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete("cancelar/{id}")]
        public async Task<IActionResult> CancelarSolicitacao(int id)
        {
            var response = await _agendaService.CancelarSolicitacao(id);

            if (response == null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}
