using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.BarbeariaUsuarioService;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { Sucesso = false, Mensagem = "Erro ao vincular cliente.", Detalhes = ex.Message });
            }
        }
    }
}