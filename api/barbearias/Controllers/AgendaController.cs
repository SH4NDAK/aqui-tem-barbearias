using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.AgendaService;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/agenda")]
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

            if (!response.Status)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("listar")]
        public async Task<IActionResult> ListarAgenda()
        {
            var response = await _agendaService.ListarAgendamentos();
    
            if (!response.Status)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> EditarAgenda(int id, AgendaCriacaoDto agendaDTO)
        {

            var response = await _agendaService.EditarAgendamento(id, agendaDTO);

            if (!response.Status)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
