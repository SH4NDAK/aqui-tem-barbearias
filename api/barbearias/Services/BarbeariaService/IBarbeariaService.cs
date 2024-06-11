using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.BarbeariaService
{
    public interface IBarbeariaService
    {
        Task<List<BarbeariaModel>> GetByCodigo(string codigo);

    }
}