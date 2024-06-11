using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.BarbeariaUsuarioService;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BarbeariaUsuarioController : ControllerBase
    {
        // Definindo o amigo que vai acessar as funções da interface
        private readonly IBarbeariaUsuarioService _barbeariaService;

        // Metodo construtor da classe que recebe a interface
        public BarbeariaUsuarioController(IBarbeariaUsuarioService barbeariaService)
        {
            _barbeariaService = barbeariaService;
        }

        [HttpPost("vincular")]
        public async Task<IActionResult> VincularCliente([FromBody] VincularRequest request)
        {
            return await _barbeariaService.VincularCliente(request);
        }

        [HttpGet("listar/{id_usr_cliente}")]
        public async Task<ActionResult<List<BarbeariaModel>>> GetByCliente(int id_usr_cliente)
        {
            return await _barbeariaService.GetByCliente(id_usr_cliente);

        }

        [HttpDelete("desvincular")]
        public async Task<IActionResult> DesvincularCliente([FromQuery] int user, [FromQuery] int barbearia)
        {
            return await _barbeariaService.DesvincularCliente(user, barbearia);
        }

    }

}