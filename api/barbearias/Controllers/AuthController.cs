using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Services.AuthService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
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

                var resposta = await _authInterface.Login(usuarioLogin); 
            return Ok(resposta);
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(UsuarioCriacaoDto usuarioRegister)
        {

            var resposta = await _authInterface.Registrar(usuarioRegister);
            return Ok(resposta);
        }
    }
}
