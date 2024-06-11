using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.BarbeariaUsuarioService
{
    public interface IBarbeariaUsuarioService
    {
        IActionResult VincularCliente(VincularRequest request);

    }
}