using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace jwtRegisterLogin.Services.ServicoService 
{
    public class ServicoService : IServicoService
    {
        private readonly AppDbContext _context;

        public ServicoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response<ServicoCriacaoDto>> CriarServico(ServicoCriacaoDto servicoDto)
        {
            Response<ServicoCriacaoDto> response = new Response<ServicoCriacaoDto>();

            try
            {
                // Verifica se o serviço já existe pelo nome
                //if (_context.Servico.Any(s => s.Nome == servicoDto.Nome))
                //{
                //    response.Mensagem = "Serviço com o mesmo nome já existe.";
                //    response.Status = false;
                //    return response;
                //}
                // Cria o objeto ServicoModel com os dados fornecidos
                if (string.IsNullOrWhiteSpace(servicoDto.Pago))
                {
                    servicoDto.Pago = "false";
                }


                ServicoModel servico = new ServicoModel
                {
                    Nome = servicoDto.Nome,
                    Descricao = servicoDto.Descricao,
                    Duracao = servicoDto.Duracao,
                    Preco = servicoDto.Preco,
                    NomeDoCliente = servicoDto.NomeDoCliente,
                    TelefoneCliente = servicoDto.TelefoneCliente,
                    Ativo = bool.Parse(servicoDto.Ativo),
                    Pago = bool.Parse(servicoDto.Pago),
                    UsuarioId = int.Parse(servicoDto.UsuarioId) // Supondo que o Id do usuário seja fornecido no DTO
                };

                // Adiciona o serviço ao contexto do banco de dados
                _context.Servico.Add(servico);
                await _context.SaveChangesAsync();

                response.Dados = servicoDto;
                response.Mensagem = "Serviço cadastrado com sucesso.";
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
            }

            return response;
        }

        async public Task<Response<List<ServicoCriacaoDto>>> ListarServico()
        {
            Response<List<ServicoCriacaoDto>> response = new Response<List<ServicoCriacaoDto>>();
            
            try
            {
                // Chamar o serviço para obter os dados do usuário
                var resultadoServico = await _context.Servico.ToListAsync();
                response.Dados = resultadoServico;
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
