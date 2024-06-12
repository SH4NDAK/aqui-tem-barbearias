using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.ServicoUsuarioService
{
    public interface IServicoUsuarioService
    {
        Task<IActionResult> VincularBarbeiro(int id_tipo_servico, int id_barbeiro);

    }
}