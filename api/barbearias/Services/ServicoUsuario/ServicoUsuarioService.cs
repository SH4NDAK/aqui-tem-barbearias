using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using jwtRegisterLogin.Services.ServicoUsuarioService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

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

        async public Task<IActionResult> VincularBarbeiro(VincularServicoUsuarioRequest request)
        {
            try
            {
                var servicoUsuario = new ServicoUsuarioModel
                {
                    Id_tipo_servico = request.Id_tipo_servico,
                    Id_usuario = request.Id_barbeiro
                };

                _context.ServicoUsuario.Add(servicoUsuario);

                await _context.SaveChangesAsync();

                return new OkObjectResult(new { Sucesso = true });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { Sucesso = false, Mensagem = "Este barbeiro já está vinculado a este tipo de serviço.", Detalhes = ex.Message });
            }
        }
        async public Task<IActionResult> DesvincularBarbeiro(int barbeiro, int tipo_servico)
        {

            var query = await _context.ServicoUsuario
            .FirstOrDefaultAsync(bu => bu.Id_usuario == barbeiro && bu.Id_tipo_servico == tipo_servico);

            if (query == null)
            {
                return new NotFoundObjectResult(new { message = "Vínculo não encontrado" });
            }

            _context.ServicoUsuario.Remove(query);

            await _context.SaveChangesAsync();

            return new OkObjectResult(new { message = "Serviço desvinculado do barbeiro com sucesso." });

        }

    }

}
