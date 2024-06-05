using jwtRegisterLogin.Data;
using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Services.UsuarioService
{
    public class UsuarioService : IUsuarioService
    {
        // Importa a variável de conexão com o BD
        private readonly AppDbContext _context;

        // Importa a variavel de cookie
        private readonly ICookieService _cookieService;

        // Método construtor da classe
        public UsuarioService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }
        public async Task<List<UsuarioModel>> GetByCargo(CargoEnum cargo, string? nome)
        {
            // Traz os usuários cadastrados
            return await _context.Usuario
                // Filtrando por cargo
                .Where(filtro => filtro.Cargo == cargo)
                .ToListAsync();
        }
    }
}