using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.UsuarioService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Services.AuthService;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IAuthInterface _authInterface;

        public UsuarioController(IUsuarioService usuarioService, IAuthInterface authInterface)
        {
            _usuarioService = usuarioService;
            _authInterface = authInterface;
        }

        [HttpGet("listar/{cargo}")]
        public async Task<ActionResult<List<UsuarioModel>>> GetByCargo(CargoEnum cargo, [FromQuery] string nome = null)

        {
            // Traz os usuários pelo cargo informado
            var usuarios = await _usuarioService.GetByCargo(cargo, nome);

            // Se não encontrou, retorna um array vazio
            if (usuarios == null)
            {
                return new List<UsuarioModel>();
            }

            // Retorna os usuários encontrados
            return Ok(usuarios);
        }

        [HttpPut("editarUsuario/{id}")]
        public async Task<IActionResult> EditarUsuario(int id, UsuarioEdicaoDto usuarioRegistro)
        {
            var response = await _authInterface.EditarUsuario(id, usuarioRegistro);

            if (response.Status == 405)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
