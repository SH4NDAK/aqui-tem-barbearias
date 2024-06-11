using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.BarbeariaUsuarioService
{
    public interface IBarbeariaUsuarioService
    {
        Task<IActionResult> VincularCliente(VincularRequest request);
        Task<ActionResult<List<BarbeariaModel>>> GetByCliente(int id_usr_cliente);
        Task<IActionResult> DesvincularCliente(int id_usuario, int id_barbearia);

    }
}