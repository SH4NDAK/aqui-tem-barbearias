using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.BarbeariaService
{
    public interface IBarbeariaService
    {
        Task<(string aviso, List<BarbeariaModel> barbearias)> GetByCodigo(string codigo, int id_usuario);

    }
}