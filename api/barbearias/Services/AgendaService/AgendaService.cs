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
using Microsoft.VisualBasic;

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
            
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            //    response.Status = 405;
            // //    return response;
            //    response.Status = StatusCodes.Status200OK;

            // }

            try
            {       
                var usuarioExistente = await _context.Usuario.FindAsync(agendaCriacaoDto.UsuarioId);

                if (usuarioExistente == null)
                {
                    response.Mensagem = "Usuário não encontrado.";
                    response.Status = 405;
                    return response;
                }

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
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
        }

        public async Task<Response<List<AgendaCriacaoDto>>> ListarAgendamentos(int cargo, int id)
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<List<AgendaCriacaoDto>> response = new Response<List<AgendaCriacaoDto>>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            // //    response.Status = 405;
            //    response.Status = StatusCodes.Status401Unauthorized;
            //    return response;
            // }

            try
            {   
                IQueryable<AgendaModel> resultadoAgendamentoQuery;
                if (cargo != 0)
                {
                    resultadoAgendamentoQuery = _context.Agenda;
                }
                else
                {
                    resultadoAgendamentoQuery = _context.Agenda.Where(a => a.Id == id);
                }

                var resultadoAgendamento = await resultadoAgendamentoQuery.ToListAsync();
                var resultadoServico = await _context.Servico.ToListAsync();

                var resultado = resultadoAgendamento.Join<AgendaModel, ServicoModel, string, dynamic>(
                    resultadoServico, 
                    agenda => agenda.Servico.ToString(),
                    servico => servico.Id.ToString(), 
                    (agenda, servico) => new
                    {
                        Descricao = agenda.Descricao,
                        Horario = agenda.Horario,
                        Data = agenda.Data,
                        Ativo = agenda.Ativo,
                        Pago = agenda.Pago,
                        Servico = servico.Id,
                        Nome = servico.Nome,
                        Duracao = servico.Duracao, 
                        Preco = servico.Preco,
                        Id = agenda.Id

                    }).ToList();
                Console.WriteLine(resultado);
                response.Dados = resultado;
                // response.Status = 200;
                response.Status = StatusCodes.Status200OK;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                // response.Status = 405;  
                response.Status = StatusCodes.Status500InternalServerError;  
            }

            return response;
        }

        public async Task<Response<AgendaCriacaoDto>> EditarAgendamento(int id, AgendaCriacaoDto agendaAtualizacaoDto)
        {
            bool cookieValido = await _cookieService.VerificarCookie();
            Console.WriteLine(cookieValido);
            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            // //    response.Status = 405;
            //    response.Status = StatusCodes.Status401Unauthorized;
            //    return response;
            // }

            try
            {
                var agenda = await _context.Agenda.FindAsync(id);

                if (agenda == null)
                {
                    response.Mensagem = "Agenda não encontrada.";
                    // response.Status = 405;
                    response.Status = StatusCodes.Status404NotFound;
                    return response;
                }

                agenda.Descricao = agendaAtualizacaoDto.Descricao;
                agenda.Data = agendaAtualizacaoDto.Data;
                agenda.Horario = agendaAtualizacaoDto.Horario;
                agenda.Servico = agendaAtualizacaoDto.Servico;
                agenda.Ativo = bool.Parse(agendaAtualizacaoDto.Ativo);
                agenda.Pago = bool.Parse(agendaAtualizacaoDto.Pago);

                _context.Agenda.Update(agenda);
                await _context.SaveChangesAsync();

                response.Dados = agendaAtualizacaoDto;
                response.Mensagem = "Agenda editada com sucesso.";
                // response.Status = 200;
                response.Status = StatusCodes.Status200OK;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                // response.Status = 405;
                response.Status = StatusCodes.Status500InternalServerError;
            }

            return response;
        }
    }
}
