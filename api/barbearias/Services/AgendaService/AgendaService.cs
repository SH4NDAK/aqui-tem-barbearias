using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.AgendaService
{
    public class AgendaService : IAgendaService
    {
        private readonly AppDbContext _context;
        private readonly ICookieService _cookieService;

        public AgendaService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }

        public async Task<Response<AgendaCriacaoDto>> CriarAgendamento(AgendaCriacaoDto agendaCriacaoDto)
        {

            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            try
            {

                AgendaModel agenda = new AgendaModel()
                {
                    Observacao = agendaCriacaoDto.Observacao,
                    NomeDoCliente = agendaCriacaoDto.NomeDoCliente,
                    Data = agendaCriacaoDto.Data,
                    Horario = agendaCriacaoDto.Horario,
                    Id_tipo_servico = agendaCriacaoDto.Id_tipo_servico,
                    Id_usuario_dono = agendaCriacaoDto.Id_usuario_dono
                };

                _context.Agenda.Add(agenda);
                await _context.SaveChangesAsync();

                response.Dados = agendaCriacaoDto;
                response.Mensagem = "Agendamento solicitado com com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
        }

        public async Task<Response<List<AgendaModel>>> VerificarCliente(string nome)
        {
            Response<List<AgendaModel>> response = new Response<List<AgendaModel>>();

            var resultado = await _context.Agenda
                .Where(agenda => agenda.NomeDoCliente == nome)
                .ToListAsync();

            response.Dados = resultado;
            response.Mensagem = null;
            response.Status = 200;

            return response;

        }

        public async Task<IActionResult> CancelarSolicitacao(int id)
        {
            var query = await _context.Agenda
            .FirstOrDefaultAsync(bu => bu.Id == id && bu.Aprovado == false);

            if (query == null)
            {
                return new NotFoundObjectResult(new { message = "Solicitação não encontrada ou já aprovada" });
            }

            _context.Agenda.Remove(query);

            await _context.SaveChangesAsync();

            return new OkObjectResult(new { message = "Solicitação cancelada com sucesso." });

        }
    }
}
