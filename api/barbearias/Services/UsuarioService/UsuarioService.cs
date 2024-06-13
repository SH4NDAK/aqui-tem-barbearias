using jwtRegisterLogin.Data;
using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<Response<List<UsuarioModel>>> GetByServico(int id_tipo_servico)
        {
            Response<List<UsuarioModel>> response = new Response<List<UsuarioModel>>();

            try
            {
                var resultado = await _context.ServicoUsuario
                    .Where(servicoUsuario => servicoUsuario.Id_tipo_servico == id_tipo_servico)
                    .Join(
                        _context.Usuario,
                        servicoUsuario => servicoUsuario.Id_usuario,
                        usuario => usuario.Id,
                        (servicoUsuario, usuario) => usuario // Projeção direta para o tipo Servico
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