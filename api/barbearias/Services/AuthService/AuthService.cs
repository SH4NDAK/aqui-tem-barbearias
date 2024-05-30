using System.ComponentModel.DataAnnotations;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.SenhaService;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using jwtRegisterLogin.Services.CookieService;

namespace jwtRegisterLogin.Services.AuthService
{
    public class AuthService : IAuthInterface
    {
        private readonly AppDbContext _context;
        private readonly ISenhaInterface _senhaInterface;

        private readonly ICookieService _cookieService;

        public AuthService(AppDbContext context, ISenhaInterface senhaInterface, ICookieService cookieService)
        {
            _context = context;
            _senhaInterface = senhaInterface;
            _cookieService = cookieService;
        }

        public async Task<Response<UsuarioCriacaoDto>> Registrar(UsuarioCriacaoDto usuarioRegistro)
        {
            Response<UsuarioCriacaoDto> respostaServico = new Response<UsuarioCriacaoDto>();

            try
            {
                if (!VerificaSeEmaileUsuarioJaExiste(usuarioRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Email/Usuário já cadastrados!";
                    return respostaServico;
                }

                _senhaInterface.CriarSenhaHash(usuarioRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);

                UsuarioModel usuario = new UsuarioModel()
                {
                    Usuario = usuarioRegistro.Usuario,
                    Email = usuarioRegistro.Email,
                    Cargo = usuarioRegistro.Cargo,
                    SenhaHash = senhaHash,
                    SenhaSalt = senhaSalt
                };

                _context.Add(usuario);
                await _context.SaveChangesAsync();
                respostaServico.Dados = usuario;
                respostaServico.Mensagem = "Usuário criado com sucesso!";
            }
            catch (Exception ex)
            {
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = 405;
            }

            return respostaServico;
        }

        public async Task<Response<string>> Login(UsuarioLoginDto usuarioLogin)
        {
            Response<string> respostaServico = new Response<string>();
            UserDetails userDetails = new UserDetails();

            try
            {
                var usuario = await _context.Usuario.FirstOrDefaultAsync(userBanco => userBanco.Email == usuarioLogin.Email);

                if (usuario == null)
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Usuário não existe.";
                    return respostaServico;
                }

                if (!_senhaInterface.VerificaSenhaHash(usuarioLogin.Senha, usuario.SenhaHash, usuario.SenhaSalt))
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Senha errada.";
                    return respostaServico;
                }

                var token = _senhaInterface.CriarToken(usuario);

                var tokenModel = new TokenModel
                {
                    Token = token,
                    CriadaEm = DateTime.Now.ToString(),
                    ExpiraEm = DateTime.Now.AddHours(2).ToString(),
                    IdUsuario = usuario.Id
                };

                _context.TokenDb.Add(tokenModel);
                await _context.SaveChangesAsync();

                userDetails.Token = token;
                userDetails.Usuario = usuario.Usuario;
                userDetails.Email = usuario.Email;
                userDetails.Cargo = usuario.Cargo;

                respostaServico.Dados = userDetails;
                respostaServico.Mensagem = "Usuário logado com sucesso!";
                respostaServico.Status = 200;

                Console.Write($" Token: {token}");
                 _cookieService.SalvarCookie(token);

                return respostaServico;
            }
            catch (Exception exception)
            {
                respostaServico.Status = 500;
                respostaServico.Mensagem = "Erro ao realizar o login.";
                return respostaServico;
            }
        }

        public bool VerificaSeEmaileUsuarioJaExiste(UsuarioCriacaoDto usuarioRegistro)
        {
            var usuario = _context.Usuario.FirstOrDefault(userBanco => userBanco.Email == usuarioRegistro.Email || userBanco.Usuario == usuarioRegistro.Usuario);

            return usuario == null;
        }
    }
}
