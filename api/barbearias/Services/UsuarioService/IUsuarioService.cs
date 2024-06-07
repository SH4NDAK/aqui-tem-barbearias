using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.UsuarioService
{
    public interface IUsuarioService
    {
        Task<List<UsuarioModel>> GetByCargo(CargoEnum cargo, string nome = null);
    }
}