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

        [HttpPatch("editar")]
        public async Task<IActionResult> EditarSolicitacao(AgendaCriacaoDto agendaDTO)
        {
            var response = await _agendaService.EditarSolicitacao(agendaDTO);

            if (response == null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("listar/{id_barbeiro}")]
        public async Task<IActionResult> ListarAgendamentos(int id_barbeiro, [FromQuery] string? data, [FromQuery] string? cliente, [FromQuery] bool? aprovados)
        {
            var response = await _agendaService.ListarAgendamentos(id_barbeiro, data, cliente, aprovados);

            if (response == null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPatch("aprovacao")]
        public async Task<IActionResult> AprovarReprovarAgendamento(AgendaStatusDTO agendaStatus)
        {
            var response = await _agendaService.AprovarReprovarAgendamento(agendaStatus);

            if (response == null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }


    }
}
