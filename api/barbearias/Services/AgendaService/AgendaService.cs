using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Services.AgendaService 
{
    public class AgendaService : IAgendaService
    {
        private readonly AppDbContext _context;

        public AgendaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response<AgendaCriacaoDto>> CriarAgendamento(AgendaCriacaoDto agendaCriacaoDto)
        {
            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            try
            {
                if (string.IsNullOrWhiteSpace(agendaCriacaoDto.Pago))
                {
                    agendaCriacaoDto.Pago = "false";
                }
                if (string.IsNullOrWhiteSpace(agendaCriacaoDto.Ativo))
                {
                    agendaCriacaoDto.Ativo = "true";
                }

                AgendaModel agenda = new AgendaModel()
                {
                    Descricao = agendaCriacaoDto.Descricao,
                    NomeDoCliente = agendaCriacaoDto.NomeDoCliente,
                    Data = agendaCriacaoDto.Data,
                    Horario = agendaCriacaoDto.Horario,
                    Servico = agendaCriacaoDto.Servico,
                    Ativo = bool.Parse(agendaCriacaoDto.Ativo),
                    Pago = bool.Parse(agendaCriacaoDto.Pago),
                };

                _context.Agenda.Add(agenda);
                await _context.SaveChangesAsync();

                response.Dados = agendaCriacaoDto;
                response.Mensagem = "Agenda cadastrada com sucesso.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
            }

            return response;
        }

        public async Task<Response<List<AgendaCriacaoDto>>> ListarAgendamentos()
        {
            Response<List<AgendaCriacaoDto>> response = new Response<List<AgendaCriacaoDto>>();

            try
            {
                var resultadoServico = await _context.Agenda.Where(a => a.Ativo == true).ToListAsync();
                response.Dados = resultadoServico;
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
            }

            return response;
        }

        public async Task<Response<AgendaCriacaoDto>> EditarAgendamento(int id, AgendaCriacaoDto agendaAtualizacaoDto)
        {
            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            try
            {
                var agenda = await _context.Agenda.FindAsync(id);

                if (agenda == null)
                {
                    response.Mensagem = "Agenda não encontrada.";
                    response.Status = false;
                    return response;
                }

                agenda.Descricao = agendaAtualizacaoDto.Descricao;
                agenda.NomeDoCliente = agendaAtualizacaoDto.NomeDoCliente;
                agenda.Data = agendaAtualizacaoDto.Data;
                agenda.Horario = agendaAtualizacaoDto.Horario;
                agenda.Servico = agendaAtualizacaoDto.Servico;
                agenda.Ativo = bool.Parse(agendaAtualizacaoDto.Ativo);
                agenda.Pago = bool.Parse(agendaAtualizacaoDto.Pago);

                _context.Agenda.Update(agenda);
                await _context.SaveChangesAsync();

                response.Dados = agendaAtualizacaoDto;
                response.Mensagem = "Agenda editada com sucesso.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
            }

            return response;
        }
    }
}
