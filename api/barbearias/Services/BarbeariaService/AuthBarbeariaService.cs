using System.ComponentModel.DataAnnotations;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.SenhaService;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
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
            return !_context.Barbershop.Any(userBanco => userBanco.Email == barbeariaRegistro.Email);
        }

        public bool VerificarSeEmailJaExiste2(int id, BarbeariaEdicaoDto barbeariaRegistro)
        {
            return _context.Barbershop.Any(userBanco => userBanco.Id != id && userBanco.Email == barbeariaRegistro.Email);
        }

        public bool VerificarSeTelefoneJaExiste(BarbeariaCriacaoDto barbeariaRegistro)
        {
            return !_context.Barbershop.Any(userBanco => userBanco.Telefone == barbeariaRegistro.Telefone);
        }

        public bool VerificarCNPJJaExisteOuValido(BarbeariaCriacaoDto barbeariaRegistro)
        {
            return !_context.Barbershop.Any(userBanco => userBanco.CNPJ == barbeariaRegistro.CNPJ);
        }

        public bool VerificarCNPJJaExisteOuValido2(int id, BarbeariaEdicaoDto barbeariaRegistro)
        {
            return _context.Barbershop.Any(userBanco => userBanco.Id != id && userBanco.CNPJ == barbeariaRegistro.CNPJ);
        }

        public async Task<Response<BarbeariaCriacaoDto>> RegistrarBarbearia(BarbeariaCriacaoDto barbeariaRegistro)
        {
            var respostaServico = new Response<BarbeariaCriacaoDto>();

            try
            {
                if (!VerificarSeEmailJaExiste(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Email já cadastrado!";
                    return respostaServico;
                }

                if (!VerificarSeTelefoneJaExiste(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Telefone já cadastrado!";
                    return respostaServico;
                }

                barbeariaRegistro.CNPJ = barbeariaRegistro.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "");

                if (!VerificarCNPJJaExisteOuValido(barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "CNPJ já cadastrado!";
                    return respostaServico;
                }

                _senhaInterface.CriarSenhaHash(barbeariaRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);

                var barbearia = new BarbershopModel
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
                respostaServico.Dados = barbeariaRegistro;
                respostaServico.Mensagem = "Barbearia criada com sucesso!";
                respostaServico.Status = 200;
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
            var respostaServico = new Response<string>();

            try
            {
                var barbearia = await _context.Barbershop.FirstOrDefaultAsync(userBanco => userBanco.Email == barbeariaLogin.Login);

                if (barbearia == null || !_senhaInterface.VerificaSenhaHash(barbeariaLogin.Senha, barbearia.SenhaHash, barbearia.SenhaSalt))
                {
                    respostaServico.Status = 400;
                    respostaServico.Mensagem = "Credenciais inválidas.";
                    return respostaServico;
                }

                var token = _senhaInterface.CriarTokenBarberia(barbearia);
                var barberDetails = new BarberDetails
                {
                    Token = token,
                    Nome = barbearia.Nome,
                    Email = barbearia.Email,
                    Telefone = barbearia.Telefone,
                    CNPJ = barbearia.CNPJ,
                    Id = barbearia.Id
                };

                respostaServico.Dados = barberDetails;
                respostaServico.Mensagem = "Barbearia logada com sucesso!";
                respostaServico.Status = 200;
            }
            catch (Exception ex)
            {
                respostaServico.Status = 500;
                respostaServico.Mensagem = $"Erro ao realizar o login: {ex.Message}";
            }

            return respostaServico;
        }

        public async Task<Response<BarbeariaEdicaoDto>> EditarBarbearia(int id, BarbeariaEdicaoDto barbeariaRegistro)
        {
            var respostaServico = new Response<BarbeariaEdicaoDto>();

            try
            {
                var barbearia = await _context.Barbershop.FindAsync(id);

                if (barbearia == null)
                {
                    respostaServico.Mensagem = "Barbearia não encontrada.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }

                if (VerificarSeEmailJaExiste2(id, barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "Email já cadastrado!";
                    return respostaServico;
                }

                if (VerificarCNPJJaExisteOuValido2(id, barbeariaRegistro))
                {
                    respostaServico.Status = 405;
                    respostaServico.Mensagem = "CNPJ já cadastrado!";
                    return respostaServico;
                }

                if (!string.IsNullOrEmpty(barbeariaRegistro.Email))
                {
                    var emailAttribute = new EmailAddressAttribute();
                    if (!emailAttribute.IsValid(barbeariaRegistro.Email))
                    {
                        respostaServico.Status = 405;
                        respostaServico.Mensagem = "Email inválido!";
                        return respostaServico;
                    }
                }

                if (!string.IsNullOrEmpty(barbeariaRegistro.CNPJ))
                {

                    var validateCnpjAttribute = new BarbeariaCriacaoDto.ValidateCNPJAttribute();
                    if (!validateCnpjAttribute.IsValid(barbeariaRegistro.CNPJ))
                    {
                        respostaServico.Status = 405;
                        respostaServico.Mensagem = "CNPJ inválido!";
                        return respostaServico;
                    }
                }                

                barbearia.Nome = !string.IsNullOrEmpty(barbeariaRegistro.Nome) ? barbeariaRegistro.Nome : barbearia.Nome;
                barbearia.Email = !string.IsNullOrEmpty(barbeariaRegistro.Email) ? barbeariaRegistro.Email : barbearia.Email;

                if (!string.IsNullOrEmpty(barbeariaRegistro.Senha))
                {
                    _senhaInterface.CriarSenhaHash(barbeariaRegistro.Senha, out byte[] senhaHash, out byte[] senhaSalt);
                    barbearia.SenhaHash = senhaHash;
                    barbearia.SenhaSalt = senhaSalt;
                }

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
    }
}
