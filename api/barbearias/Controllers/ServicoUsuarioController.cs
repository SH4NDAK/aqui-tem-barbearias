using jwtRegisterLogin.Services.ServicoUsuarioService; // Adicionado o namespace do ServicoService
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicoUsuarioController : ControllerBase
    {
        private readonly IServicoUsuarioService _servicoService;

        public ServicoUsuarioController(IServicoUsuarioService servicoService) // Modificado o parâmetro no construtor
        {
            _servicoService = servicoService;
        }

        [HttpPost("vincular")]
        public async Task<IActionResult> VincularBarbeiro([FromBody] VincularServicoUsuarioRequest request)
        {
            return await _servicoService.VincularBarbeiro(request);
        }

        [HttpDelete("desvincular")]
        public async Task<IActionResult> DesvincularBarbeiro([FromQuery] int barbeiro, [FromQuery] int tipo_servico)
        {
            return await _servicoService.DesvincularBarbeiro(barbeiro, tipo_servico);
        }



    }
}
