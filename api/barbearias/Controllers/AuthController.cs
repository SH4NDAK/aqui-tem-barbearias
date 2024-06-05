using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Services.AuthService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthContoller : ControllerBase
    {
        private readonly IAuthInterface _authInterface;
        public AuthContoller(IAuthInterface authInterface)
        {
                _authInterface = authInterface;
        }

        //Metodo Registrar
        [HttpPost("login")]
        public async Task<ActionResult> Login(UsuarioLoginDto usuarioLogin)
        {
            try
            {
                var response = await _authInterface.Login(usuarioLogin);
                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, $"Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(UsuarioCriacaoDto usuarioRegister)
        {

            var resposta = await _authInterface.Registrar(usuarioRegister);
            return Ok(resposta);
        }
    }
}
