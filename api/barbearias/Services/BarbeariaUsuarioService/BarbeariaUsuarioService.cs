using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.BarbeariaUsuarioService;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Services.BarbeariaService
{
    public class BarbeariaUsuarioService : IBarbeariaUsuarioService
    {
        // Variável de conexão com banco de dados
        private readonly AppDbContext _context;

        // Variável de cookie
        private readonly ICookieService _cookieService;


        // Método construtor da classe pra setar as variaveis de conexão com bd e cookie
        public BarbeariaUsuarioService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }

        public async Task<ActionResult<List<BarbeariaModel>>> GetByCliente(int id_usr_cliente)
        {
            Console.WriteLine(id_usr_cliente);
            
            var barbearias = await _context.BarbeariaUsuario
                .Where(bu => bu.Id_usuario == id_usr_cliente)
                .Select(bu => new BarbeariaModel
                {
                    Id = bu.Barbearia.Id,
                    Nome = bu.Barbearia.Nome
                    // Mapeie outras propriedades conforme necessário
                })
                .ToListAsync();

            if (barbearias == null || barbearias.Count == 0)
            {
                return new List<BarbeariaModel>();
            }

            return barbearias;
        }

        // Função que vincula um usuário a uma barbearia
        public async Task<IActionResult> VincularCliente(VincularRequest request)
        {
            try
            {
                var barbeariaUsuario = new BarbeariaUsuarioModel
                {
                    Id_usuario = request.IdUsuario,
                    Id_barbearia = request.IdBarbearia
                };

                _context.BarbeariaUsuario.Add(barbeariaUsuario);

                await _context.SaveChangesAsync();

                return new OkObjectResult(new { Sucesso = true });
            }
            catch (DbUpdateException ex) when ((ex.InnerException as SqlException)?.Number == 2627 || (ex.InnerException as SqlException)?.Number == 2601)
            {
                // 2627 é para violação de chave única, 2601 é para violação de chave primária
                return new BadRequestObjectResult(new { Codigo = 403, Sucesso = false, Mensagem = "Você já é um cliente dessa barbearia.", Detalhes = ex.Message });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { Sucesso = false, Mensagem = "Erro ao vincular cliente.", Detalhes = ex.Message });
            }
        }

    }
}