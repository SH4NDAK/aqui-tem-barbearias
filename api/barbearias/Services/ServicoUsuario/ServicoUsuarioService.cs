using jwtRegisterLogin.Data;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.CookieService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Services.BarbeariaService
{
    public class ServicoUsuarioService
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

    }
}