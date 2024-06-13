using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Services.ServicoUsuarioService
{
    public interface IServicoUsuarioService
    {
        Task<IActionResult> VincularBarbeiro(VincularServicoUsuarioRequest request);
        Task<IActionResult> DesvincularBarbeiro(int id_barbeiro, int id_tipo_servico);

    }
}