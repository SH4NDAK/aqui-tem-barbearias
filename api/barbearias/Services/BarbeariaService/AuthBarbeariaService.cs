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

namespace jwtRegisterLogin.Services.AuthBarbeariaService
{
    public class AuthBarbeariaService : IAuthBarbeariaInterface
    {
        private readonly AppDbContext _context;
        private readonly ISenhaInterface _senhaInterface;

        public AuthBarbeariaService(AppDbContext context, ISenhaInterface senhaInterface)
        {
            _context = context;
            _senhaInterface = senhaInterface;
        }

        public bool VerificarSeEmailJaExiste(BarbeariaCriacaoDto barbeariaRegistro)
        {
            var usuario = _context.Barbershop.FirstOrDefault(userBanco => userBanco.Email == barbeariaRegistro.Email);

            return usuario == null;
        }
        public bool VerificarSeTelefoneJaExiste(BarbeariaCriacaoDto barbeariaRegistro)
        {
            var usuario = _context.Barbershop.FirstOrDefault(userBanco => userBanco.Telefone == barbeariaRegistro.Telefone);

            return usuario == null;
        }
        public bool VerificarCNPJJaExisteOuValido(BarbeariaCriacaoDto barbeariaRegistro)
        {
            var usuario = _context.Barbershop.FirstOrDefault(userBanco => userBanco.CNPJ == barbeariaRegistro.CNPJ);

            return usuario == null;
        }
        

        public async Task<Response<BarbeariaCriacaoDto>> RegistrarBarbearia(BarbeariaCriacaoDto barbeariaRegistro)
        {
            Response<BarbeariaCriacaoDto> respostaServico = new Response<BarbeariaCriacaoDto>();

            try 
            {
                if (!VerificarSeEmailJaExiste(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Email já cadastrados!";
                    return respostaServico;
                }

                if (!VerificarSeTelefoneJaExiste(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Telefone já cadastrados!";
                    return respostaServico;
                }

                barbeariaRegistro.CNPJ = barbeariaRegistro.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "");

                if (!VerificarCNPJJaExisteOuValido(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "CNPJ já cadastrados!";
                    return respostaServico;
                }

                _senhaInterface.CriarSenhaHash(barbeariaRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);

                BarbershopModel barbearia = new BarbershopModel()
                {
                    Nome = barbeariaRegistro.Nome,
                    Email = barbeariaRegistro.Email,
                    Telefone = barbeariaRegistro.Telefone,
                    CNPJ = barbeariaRegistro.CNPJ,
                    SenhaHash = senhaHash,
                    SenhaSalt = senhaSalt
                };

                _context.Add(barbearia);
                await _context.SaveChangesAsync();
                respostaServico.Dados = barbearia;
                respostaServico.Mensagem = "Barbearia criada com sucesso!";
                
            }
            catch (Exception ex)
            {
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = 405;
            }

            return respostaServico;
        }

        public async Task<Response<string>> LoginBarbearia(UsuarioLoginDto barbeariaLogin)
        {
            Response<string> respostaServico = new Response<string>();
            BarberDetails barberDetails = new BarberDetails();

            try
            {
                var barbearia = await _context.Barbershop.FirstOrDefaultAsync(userBanco => userBanco.Email == barbeariaLogin.Login);

                if (barbearia == null)
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Credenciais inválidas.";
                    return respostaServico;
                }

                if (!_senhaInterface.VerificaSenhaHash(barbeariaLogin.Senha, barbearia.SenhaHash, barbearia.SenhaSalt))
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Credenciais inválidas.";
                    return respostaServico;
                }

                var token = _senhaInterface.CriarTokenBarberia(barbearia);

                // var tokenModel = new TokenModel
                // {
                //     Token = token,
                //     CriadaEm = DateTime.Now.ToString(),
                //     ExpiraEm = DateTime.Now.AddHours(2).ToString(),
                //     IdUsuario = barbearia.Id
                // };

                // _context.TokenDb.Add(tokenModel);
                // await _context.SaveChangesAsync();

                barberDetails.Token = token;
                barberDetails.Nome = barbearia.Nome;
                barberDetails.Email = barbearia.Email;
                barberDetails.Telefone = barbearia.Telefone;
                barberDetails.CNPJ = barbearia.CNPJ;
                barberDetails.Id = barbearia.Id;

                respostaServico.Dados = barberDetails;
                respostaServico.Mensagem = "Barbearia logado com sucesso!";
                respostaServico.Status = 200;


                return respostaServico;
            }
            catch (Exception exception)
            {
                Console.Write(exception);

                respostaServico.Status = 500;
                respostaServico.Mensagem = "Erro ao realizar o login.";
                return respostaServico;
            }
        }

    }
}