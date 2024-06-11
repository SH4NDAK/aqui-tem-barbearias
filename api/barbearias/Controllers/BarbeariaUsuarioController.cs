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
        private readonly  IBarbeariaUsuarioService _barbeariaService;

        // Metodo construtor da classe que recebe a interface
        public BarbeariaUsuarioController(IBarbeariaUsuarioService barbeariaService)
        {
            _barbeariaService = barbeariaService;
        }

        [HttpPost("vincular")]
        public IActionResult VincularCliente([FromBody] VincularRequest request)
        {
            return Ok(new { Sucesso = true, Usuario = request});
        }

    }

}