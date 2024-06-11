using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.BarbeariaService;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BarbeariaController : ControllerBase
    {
        // Definindo o amigo que vai acessar as funções da interface
        private readonly IBarbeariaService _barbeariaService;

        // Metodo construtor da classe que recebe a interface
        public BarbeariaController(IBarbeariaService barbeariaService)
        {
            _barbeariaService = barbeariaService;
        }

        // Rota de buscar a barbearia por código
        [HttpGet("listar/{codigo}")]
        public async Task<ActionResult> GetByCodigo(string codigo, [FromQuery] int id_usuario)
        {
            var (aviso, barbearias) = await _barbeariaService.GetByCodigo(codigo, id_usuario);

            if (aviso != null)
            {
                return BadRequest(aviso);
            }

            if (barbearias == null || barbearias.Count == 0)
            {
                return NotFound();
            }

            return Ok(barbearias);

        }

    }

}