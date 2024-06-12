using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data.Common;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.ServicoService
{
    public class ServicoService : IServicoService
    {
        private readonly AppDbContext _context;

        public ServicoService(AppDbContext context)
        {
            _context = context;
        }

        private readonly ICookieService _cookieService;

        public ServicoService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }

        public async Task<Response<ServicoCriacaoDto>> CriarServico(ServicoCriacaoDto servicoDto)
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<ServicoCriacaoDto> response = new Response<ServicoCriacaoDto>();

            try
            {

                ServicoModel servico = new ServicoModel
                {
                    Nome = servicoDto.Nome,
                    Descricao = servicoDto.Descricao,
                    Duracao = servicoDto.Duracao,
                    Preco = decimal.Parse(servicoDto.Preco),
                    Ativo = true
                };

                // Adiciona o serviço ao contexto do banco de dados
                _context.Servico.Add(servico);
                await _context.SaveChangesAsync();

                response.Dados = servicoDto;
                response.Mensagem = "Serviço cadastrado com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = "Já existe um tipo de serviço cadastrado com este nome";
                response.Status = 405;
            }

            return response;
        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListarServico()
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();

            try
            {
                var query = _context.Servico.AsQueryable();

                // Chamar o serviço para obter os dados do usuário
                var resultado = await query.ToListAsync();

                response.Dados = resultado;
                response.Mensagem = "Serviço e usuário exibidos com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;

        }

        public async Task<Response<ServicoCriacaoDto>> EditarServico(int id, ServicoCriacaoDto servicoDto)
        {

            Response<ServicoCriacaoDto> response = new Response<ServicoCriacaoDto>();

            try
            {
                var servico = await _context.Servico.FindAsync(id);

                if (servico == null)
                {
                    response.Mensagem = "Servico não encontrado.";
                    response.Status = 405;
                    return response;
                }

                servico.Nome = servicoDto.Nome;
                servico.Descricao = servicoDto.Descricao;
                servico.Duracao = servicoDto.Duracao;
                servico.Preco = decimal.Parse(servicoDto.Preco);
                servico.Ativo = bool.Parse(servicoDto.Ativo);

                // Adiciona o serviço ao contexto do banco de dados
                _context.Servico.Update(servico);
                await _context.SaveChangesAsync();


                response.Dados = servicoDto;
                response.Mensagem = "Servico editado com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Status = 405;
            }

            return response;
        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListarUnicoServico(int id)
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();

            try
            {
                // Chamar o serviço para obter os dados do usuário
                //var resultadoServico = await _context.Servico.ToListAsync();

                var resultado = await _context.Servico
                .Where(servico => servico.Id == id)
                .ToListAsync();

                response.Dados = resultado;
                response.Mensagem = "Serviço e usuário exibidos com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;

        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListByBarbeiro(int id)
        {
            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();

            try
            {
                var resultado = await _context.ServicoUsuario
                    .Where(servicoUsuario => servicoUsuario.Id_usuario == id)
                    .Join(
                        _context.Servico, // Tabela com a qual você quer fazer o join
                        servicoUsuario => servicoUsuario.Id_tipo_servico, // Chave estrangeira em ServicoUsuario
                        servico => servico.Id, // Chave primária em Servico
                        (servicoUsuario, servico) => new
                        {
                            ServicoUsuario = servicoUsuario,
                            Servico = servico
                        } // Resultado do join
                    )
                    .ToListAsync();

                response.Dados = resultado;
                response.Status = 200;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }
            return response;
        }
    }
}
