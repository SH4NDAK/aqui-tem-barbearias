using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Services.BarbeariaService
{
    public class BarbeariaService : IBarbeariaService
    {
        // Variável de conexão com banco de dados
        private readonly AppDbContext _context;

        // Variável de cookie
        private readonly ICookieService _cookieService;


        // Método construtor da classe pra setar as variaveis de conexão com bd e cookie
        public BarbeariaService(AppDbContext context, ICookieService cookieService)
        {
            _context = context;
            _cookieService = cookieService;
        }


        // Função que pesquisa uma barbearia pelo código de autenticação dela
        async public Task<List<BarbeariaModel>> GetByCodigo(string codigo)
        {
            // Monta a "query" de pesquisa
            var query = _context.Barbearia.AsQueryable();

            // Aplica o filtro de código (obrigatorio)
            query = query.Where(filtro => filtro.Codigo_auth == codigo);

            // Traz a barbearia com o código
            var result = await query.ToListAsync();

            // Retorna o resultado pra controller
            return result;
        }
    }
}