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

        public async Task<Response<AgendaCriacaoDto>> EditarSolicitacao(AgendaCriacaoDto agendaCriacaoDto)
        {
            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            try
            {
                // Primeiro, encontre o agendamento existente no banco de dados pelo ID
                var agendaExistente = await _context.Agenda
                    .FirstOrDefaultAsync(a => a.NomeDoCliente == agendaCriacaoDto.NomeDoCliente && a.Aprovado == false);

                if (agendaExistente == null)
                {
                    response.Mensagem = "Agendamento não encontrado.";
                    response.Status = 404;
                    return response;
                }

                // Atualize os campos relevantes do agendamento existente com os novos valores
                agendaExistente.Observacao = agendaCriacaoDto.Observacao;
                agendaExistente.Data = agendaCriacaoDto.Data;
                agendaExistente.Horario = agendaCriacaoDto.Horario;
                agendaExistente.Id_tipo_servico = agendaCriacaoDto.Id_tipo_servico;
                agendaExistente.Id_usuario_dono = agendaCriacaoDto.Id_usuario_dono;

                // Salve as mudanças no banco de dados
                _context.Agenda.Update(agendaExistente);
                await _context.SaveChangesAsync();

                // Preencha a resposta com os dados atualizados e mensagem de sucesso
                response.Dados = agendaCriacaoDto;
                response.Mensagem = "Agendamento solicitado editado com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                // Em caso de erro, preencha a resposta com a mensagem de erro e status apropriados
                response.Mensagem = ex.Message;
                response.Status = 500; // Use o status HTTP apropriado para erro interno do servidor
            }

            return response;
        }

        public async Task<Response<AgendaCriacaoDto>> ListarAgendamentos(int id_barbeiro, string? data, string? cliente, bool? aprovados)
        {
            Response<AgendaCriacaoDto> response = new Response<AgendaCriacaoDto>();

            try
            {
                var query = _context.Agenda
                .Where(a => a.Id_usuario_dono == id_barbeiro);

                if (!string.IsNullOrEmpty(data))
                {
                    query = query.Where(a => a.Data == data);
                }

                if (!string.IsNullOrEmpty(cliente))
                {
                    query = query.Where(a => a.NomeDoCliente.Contains(cliente));
                }

                if (aprovados == true)
                {
                    query = query.Where(a => a.Aprovado == true);
                }

                var agendamentos = await query
                    .Join(
                        _context.Servico,
                        agenda => agenda.Id_tipo_servico,
                        servico => servico.Id,
                        (agenda, servico) => new AgendaCriacaoDto
                        {
                            Aprovado = agenda.Aprovado,
                            Observacao = agenda.Observacao,
                            NomeDoCliente = agenda.NomeDoCliente,
                            Data = agenda.Data,
                            Horario = agenda.Horario,
                            Id_tipo_servico = (int)agenda.Id_tipo_servico,
                            Id_usuario_dono = agenda.Id_usuario_dono,
                            NomeTipoServico = servico.Nome
                        })
                    .ToListAsync();

                // Preencha a resposta com os dados atualizados e mensagem de sucesso
                response.Dados = agendamentos;
                response.Mensagem = "";
                response.Status = 200;

            }
            catch (Exception ex)
            {
                // Em caso de erro, preencha a resposta com a mensagem de erro e status apropriados
                response.Mensagem = ex.Message;
                response.Status = 500; // Use o status HTTP apropriado para erro interno do servidor
            }

            return response;
        }

        public async Task<Response<AgendaStatusDTO>> AprovarReprovarAgendamento(AgendaStatusDTO agendaStatus)
        {
            Response<AgendaStatusDTO> response = new Response<AgendaStatusDTO>();

            try
            {
                // Verificar se o agendamento existe
                AgendaModel agenda = _context.Agenda.FirstOrDefault(a => a.Data == agendaStatus.Data && a.Horario == agendaStatus.Horario && a.NomeDoCliente == agendaStatus.NomeDoCliente);

                if (agenda == null)
                {
                    response.Mensagem = "Agendamento não encontrado.";
                    response.Status = 404; // Not Found
                    return response;
                }

                // Atualiza o status do agendamento
                agenda.Aprovado = agendaStatus.Aprovado;

                // Salva as mudanças no banco de dados
                await _context.SaveChangesAsync();

                // Atualiza o objeto de retorno com os dados atualizados
                response.Dados = agendaStatus;
                response.Mensagem = "Agendamento atualizado com sucesso.";
                response.Status = 200; // OK
            }
            catch (Exception ex)
            {
                response.Mensagem = $"Erro ao atualizar agendamento: {ex.Message}";
                response.Status = 500; // Internal Server Error
            }

            return response;
        }

    }
}
