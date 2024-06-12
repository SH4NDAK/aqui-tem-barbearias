using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using jwtRegisterLogin.Services.ServicoUsuarioService;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.ServicoUsuarioService
{
    public class ServicoUsuarioService : IServicoUsuarioService
    {
        // Variável de conexão com banco de dados
        private readonly AppDbContext _context;

        // Variável de cookie
        private readonly ICookieService _cookieService;


        // Método construtor da classe pra setar as variaveis de conexão com bd e cookie
        public ServicoUsuarioService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }

        public Task<IActionResult> VincularBarbeiro(int id_tipo_servico, int id_barbeiro)
        {
            throw new NotImplementedException();
        }
    }
}