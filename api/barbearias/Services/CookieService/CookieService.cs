using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Data;

namespace jwtRegisterLogin.Services.CookieService
{
    public class CookieService : ICookieService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _context; 

        public CookieService(IHttpContextAccessor httpContextAccessor, AppDbContext context) 
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        // public string GetCookie(string key)
        // {
        //     return _httpContextAccessor.HttpContext.Request.Cookies[key];
        // }

        public bool CookieExists(string key)
        {
            return _httpContextAccessor.HttpContext.Request.Cookies.ContainsKey(key);
        }

        public void SalvarCookie(string token)
        {
            // Criar um novo cookie
            var cookieOptions = new CookieOptions
            {
                // Definir propriedades do cookie, como tempo de expiração, etc.
                Expires = DateTime.Now.AddHours(2), // Define o tempo de expiração para duas horas a partir do momento atual
                // Outras propriedades como Secure, HttpOnly, SameSite, etc., se necessário
            };

            // Adicionar o cookie à resposta HTTP
            _httpContextAccessor.HttpContext.Response.Cookies.Append("token", token, cookieOptions);
        }


        public async Task<bool> VerificarCookie()
        {
            try
            {
                string tokenCookie = _httpContextAccessor.HttpContext.Request.Cookies["token"];
                //var cookies = _httpContextAccessor.HttpContext.Request.Cookies;
                //string tokenCookie = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJDYXJnbyI6IjAiLCJFbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIlVzZXJuYW1lIjoidGVzdGUiLCJleHAiOjE3MTY5MDAzNjF9.M4jw2ZGvVTPcLupyEp_he0IJGFpRpKbt3NrzMoid6Xwr7fd43Je6B6w--5yRuonVQnhUTYyqUH19lWLctA2VoQ";
                
                Console.WriteLine($"Token do cookie: {tokenCookie}");

                if (string.IsNullOrEmpty(tokenCookie))
                {
                    Console.WriteLine("Cookie não encontrado.");
                    return false; 
                }
                
                TokenModel token = await _context.TokenDb.FirstOrDefaultAsync(t => t.Token == tokenCookie);

                if (token == null)
                {
                    Console.WriteLine("Token não encontrado na tabela.");
                    return false; 
                }

                Console.WriteLine("Token encontrado na tabela.");
                
                // Verifica se o token expirou
                DateTime expiraEm;
                if (!DateTime.TryParse(token.ExpiraEm, out expiraEm))
                {
                    Console.WriteLine("Falha ao converter o tempo de expiração.");
                    return false; 
                }

                Console.WriteLine($"Tempo de expiração do token: {expiraEm}");

                if (expiraEm < DateTime.Now)
                {
                    Console.WriteLine("Token expirado.");
                    return false; 
                }

                Console.WriteLine("Token válido.");
                return true; 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro ao verificar o cookie: {ex.Message}");
                return false;
            }
        }
    }
}
