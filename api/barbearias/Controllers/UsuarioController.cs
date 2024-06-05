using jwtRegisterLogin.Models;
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
        private readonly IAuthInterface _authInterface;

        public UsuarioController(IAuthInterface authInterface)
        {
            _authInterface = authInterface;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<Response<string>> GetUsuario()
        {
            Response<string> response = new Response<string>();
            response.Mensagem = "Acessei";

            return Ok(response);
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
