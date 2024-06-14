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
                    respostaServico.Mensagem = "Usuário ou senha incorretos. Verifique.";
                    return respostaServico;
                }

                if (!_senhaInterface.VerificaSenhaHash(usuarioLogin.Senha, usuario.SenhaHash, usuario.SenhaSalt))
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Usuário ou senha incorretos.";
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

                userDetails.Id = usuario.Id;
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


        public bool VerificaSeEmaileUsuarioJaExiste2(int id, UsuarioEdicaoDto usuarioRegistro)
        {
            // Obtém todos os usuários, exceto o usuário com o ID fornecido
            var usuariosExistentes = _context.Usuario.Where(userBanco => userBanco.Id != id);

            // Verifica se há algum usuário com o mesmo email ou nome de usuário do usuarioRegistro
            var usuarioExistente = usuariosExistentes.FirstOrDefault(userBanco =>
                userBanco.Email == usuarioRegistro.Email || userBanco.Usuario == usuarioRegistro.Usuario);

            // Retorna true se um usuário com o mesmo email ou nome de usuário for encontrado, caso contrário, retorna false
            return usuarioExistente != null;
        }

        async public Task<Response<UsuarioEdicaoDto>> EditarUsuario(int id, UsuarioEdicaoDto usuarioRegistro)
        {
            Response<UsuarioEdicaoDto> respostaServico = new Response<UsuarioEdicaoDto>();
                    
            try
            {
                var usuario = await _context.Usuario.FindAsync(id);

                if (usuario == null)
                {
                    respostaServico.Mensagem = "Usuário não encontrado.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }

                if (VerificaSeEmaileUsuarioJaExiste2(id, usuarioRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Email/Usuário já cadastrados!";
                    return respostaServico;
                }

                if (!string.IsNullOrEmpty(usuarioRegistro.Email))
                {
                    // Utilize a classe EmailAddressAttribute para verificar se o email é válido
                    var emailAttribute = new EmailAddressAttribute();

                    // Verifica se o email fornecido é válido
                    if (!emailAttribute.IsValid(usuarioRegistro.Email))
                    {
                        respostaServico.Status = 405;
                        respostaServico.Mensagem = "Email inválido!";
                        return respostaServico;
                    }
                    usuario.Email = usuarioRegistro.Email;
                }

                // Atualiza os campos do usuário com os valores do usuarioRegistro
                usuario.Usuario = usuarioRegistro.Usuario ?? usuario.Usuario;
                usuario.Email = !string.IsNullOrEmpty(usuarioRegistro.Email) ? usuarioRegistro.Email : usuario.Email;

                // Se a senha estiver sendo atualizada e não estiver vazia, cria um novo hash de senha
                if (!string.IsNullOrEmpty(usuarioRegistro.Senha))
                {
                    _senhaInterface.CriarSenhaHash(usuarioRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);
                    usuario.SenhaHash = senhaHash;
                    usuario.SenhaSalt = senhaSalt;
                }

                // Salva as alterações no banco de dados
                await _context.SaveChangesAsync();

                respostaServico.Mensagem = "Usuário editado com sucesso";
                respostaServico.Status = 200;
            }
            catch (Exception ex)
            {
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = 405;
            }

            return respostaServico;
        }

        async public Task<Response<string>> ExcluirUsuario(int id)
        {
            Response<string> respostaServico = new Response<string>();

            try
            {
                var usuario = await _context.Usuario.FindAsync(id);

                if (usuario == null)
                {
                    respostaServico.Mensagem = "Usuário não encontrado.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }

                // Deleta o usuário
                _context.Usuario.Remove(usuario);
                await _context.SaveChangesAsync();

                respostaServico.Mensagem = "Usuário excluído com sucesso";
                respostaServico.Status = 200;
            }
            catch (Exception ex)
            {

                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = 405;
            }

            return respostaServico;
        }
    }
}
