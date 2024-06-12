using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            //    response.Status = 405;
            //    return response;
            // }

            try
            {

                   //Verificar se o usuarioId fornecido existe
                var usuarioIdExistente = await _context.Usuario.FindAsync(int.Parse(servicoDto.UsuarioId));
                if (usuarioIdExistente == null)
                {
                    response.Mensagem = "Usuário com o Id fornecido não foi encontrado.";
                    response.Status = 405;
                    return response;
                }

                ServicoModel servico = new ServicoModel
                {
                    Nome = servicoDto.Nome,
                    Descricao = servicoDto.Descricao,
                    Duracao = servicoDto.Duracao,
                    Preco = decimal.Parse(servicoDto.Preco),
                    Ativo = bool.Parse(servicoDto.Ativo),
                    UsuarioId = int.Parse(servicoDto.UsuarioId) // Supondo que o Id do usuário seja fornecido no DTO
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
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListarServico()
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            //    response.Status = 405;
            //    return response;
            // }
            
            try
            {
                // Chamar o serviço para obter os dados do usuário
                var resultadoServico = await _context.Servico.ToListAsync();
                var resultadoUsuario = await _context.Usuario.ToListAsync();

                var resultado = resultadoServico.Join(
                    resultadoUsuario,
                    servico => servico.UsuarioId.ToString(),
                    usuario => usuario.Id.ToString(),
                    (servico, usuario) => new
                    {
                        servico.Id,
                        NomeServico = servico.Nome,
                        DescricaoServico = servico.Descricao,
                        DuracaoServico = servico.Duracao,
                        PrecoServico = servico.Preco, 
                        AtivoServico = servico.Ativo,
                        UsuarioIdServico = servico.UsuarioId,
                        NomeUsuario = usuario.Usuario
                    }).ToList();

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
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<ServicoCriacaoDto> response = new Response<ServicoCriacaoDto>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            //    response.Status = 405;
            //    return response;
            // }

            try
            {
                var servico = await _context.Servico.FindAsync(id);

                if (servico == null)
                {
                    response.Mensagem = "Servico não encontrada.";
                    response.Status = 405;
                    return response;
                }

                servico.Nome = servicoDto.Nome;
                servico.Descricao = servicoDto.Descricao;
                servico.Duracao = servicoDto.Duracao;
                servico.Preco = decimal.Parse(servicoDto.Preco);
                servico.Ativo = bool.Parse(servicoDto.Ativo);
                servico.UsuarioId = int.Parse(servicoDto.UsuarioId); // Supondo que o Id do usuário seja fornecido no DTO

                // Adiciona o serviço ao contexto do banco de dados
                _context.Servico.Update(servico);
                await _context.SaveChangesAsync();


                response.Dados = servicoDto;
                response.Mensagem = "Servico editado com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListarUnicoServico(int id)
        {
            bool cookieValido = await _cookieService.VerificarCookie();

            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();

            // if (!cookieValido)
            // {
            //    response.Mensagem = "Cookie Invalido";
            //    response.Status = 405;
            //    return response;
            // }
            
            try
            {
                // Chamar o serviço para obter os dados do usuário
                //var resultadoServico = await _context.Servico.ToListAsync();

                var resultadoServico = await _context.Servico
                .Where(servico => servico.Id == id)
                .ToListAsync(); 
                var resultadoUsuario = await _context.Usuario.ToListAsync();

                var resultado = resultadoServico.Join(
                    resultadoUsuario,
                    servico => servico.UsuarioId.ToString(),
                    usuario => usuario.Id.ToString(),
                    (servico, usuario) => new
                    {
                        servico.Id,
                        NomeServico = servico.Nome,
                        DescricaoServico = servico.Descricao,
                        DuracaoServico = servico.Duracao,
                        PrecoServico = servico.Preco, 
                        AtivoServico = servico.Ativo,
                        UsuarioIdServico = servico.UsuarioId,
                        NomeUsuario = usuario.Usuario
                    }).ToList();

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

    }
}
