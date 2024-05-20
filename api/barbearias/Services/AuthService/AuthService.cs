using System.ComponentModel.DataAnnotations;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.SenhaService;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;


namespace jwtRegisterLogin.Services.AuthService
{
    public class AuthService : IAuthInterface
    {
        private readonly AppDbContext _context;
        private readonly ISenhaInterface _senhaInterface;
        public AuthService(AppDbContext context, ISenhaInterface senhaInterface)
        {
            _context = context;
            _senhaInterface = senhaInterface;
        }


        public async Task<Response<UsuarioCriacaoDto>> Registrar(UsuarioCriacaoDto usuarioRegistro)
        {
            Response<UsuarioCriacaoDto> respostaServico = new Response<UsuarioCriacaoDto>();

            try
            {   
                //Verifica se o email ou o Usario ja existem
                if (!VerificaSeEmaileUsuarioJaExiste(usuarioRegistro))
                {
                    respostaServico.Dados = null;
                    respostaServico.Status = false;
                    respostaServico.Mensagem = "Email/Usuário já cadastrados!";
                    return respostaServico;
                }

                //Senha criptografada
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
                respostaServico.Dados = null;
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = false;


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

                if(usuario == null)
                {
                    respostaServico.Mensagem = "Credenciais inválidas!";
                    respostaServico.Status = false;
                    return respostaServico;
                }

                if (!_senhaInterface.VerificaSenhaHash(usuarioLogin.Senha, usuario.SenhaHash, usuario.SenhaSalt))
                {
                    respostaServico.Mensagem = "Credenciais inválidas!";
                    respostaServico.Status = false;
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
                respostaServico.Status = true;

            }catch (Exception ex)
            {
                respostaServico.Dados = null;
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = false;
                //
                
            }   

            return respostaServico;
        }

        public bool VerificaSeEmaileUsuarioJaExiste(UsuarioCriacaoDto usuarioRegistro)
        {
            var usuario = _context.Usuario.FirstOrDefault(userBanco => userBanco.Email == usuarioRegistro.Email || userBanco.Usuario == usuarioRegistro.Usuario);

            if (usuario != null) return false;

            return true;


        }


    }
}
