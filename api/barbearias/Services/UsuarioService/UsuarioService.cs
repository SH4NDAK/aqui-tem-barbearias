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
        public async Task<List<UsuarioModel>> GetByCargo(CargoEnum cargo, string nome = null)
        {
            // Monta a "query" de pesquisa
            var query = _context.Usuario.AsQueryable();

            // Filtro de cargo (obrigatorio)
            query = query.Where(filtro => filtro.Cargo == cargo);

            // Filtro de nome (opcional)
            if (!string.IsNullOrEmpty(nome))
            {
                query = query.Where(filtro => filtro.Usuario.Contains(nome));
            }

            // Traz os usuários cadastrados
            var result = await query.ToListAsync();

            // Log para debugging
            Console.WriteLine($"Número de usuários encontrados: {result.Count}");

            return result;
        }
    }
}