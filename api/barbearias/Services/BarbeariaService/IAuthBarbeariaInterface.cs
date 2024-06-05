using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.AuthBarbeariaService
{
    public interface IAuthBarbeariaInterface 
    {
        Task<Response<BarbeariaCriacaoDto>> RegistrarBarbearia(BarbeariaCriacaoDto barbeariaRegistro);
        Task<Response<string>> LoginBarbearia(UsuarioLoginDto barbeariaLogin);
    }
}

