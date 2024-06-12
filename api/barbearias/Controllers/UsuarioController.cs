using jwtRegisterLogin.Enum;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.UsuarioService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("listar/{cargo}/{nome}")]
        public async Task<ActionResult<List<UsuarioModel>>> GetByCargo(CargoEnum cargo, string? nome)
        {
            // Traz os usuários pelo cargo informado
            var usuarios = await _usuarioService.GetByCargo(cargo, nome);

            // Se não encontrou, retorna 404
            if (usuarios == null || usuarios.Count == 0)
            {
                return NotFound("caiu aqui");
            }

            // Retorna os usuários encontrados
            return Ok(usuarios);
        }

        [HttpGet("listar/email/{email}")]
        public async Task<ActionResult<List<UsuarioModel>>> GetByEmail(string email)
        {
            // Traz os usuários pelo cargo informado
            var usuarios = await _usuarioService.GetByEmail(email);

            // Se não encontrou, retorna 404
            if (usuarios == null || usuarios.Count == 0)
            {
                return NotFound("caiu aqui");
            }

            // Retorna os usuários encontrados
            return Ok(usuarios[0]);
        }

    }
}
