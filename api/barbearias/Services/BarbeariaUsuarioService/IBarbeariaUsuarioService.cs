using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.BarbeariaUsuarioService
{
    public interface IBarbeariaUsuarioService
    {
        Task<IActionResult> VincularCliente(VincularRequest request);

    }
}