// using jwtRegisterLogin.Dtos;
// using jwtRegisterLogin.Services.AuthBarbeariaService;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;

// namespace jwtRegisterLogin.Controllers
// {
//     [Route("api/auth")]
//     [ApiController]
//     public class BarbeariaAuthContoller : ControllerBase
//     {
//         private readonly IAuthBarbeariaInterface _authInterface;
//         public BarbeariaAuthContoller(IAuthBarbeariaInterface authInterface)
//         {
//                 _authInterface = authInterface;
//         }


//         [HttpPost("registerBarbearia")]
//         public async Task<ActionResult> Register(BarbeariaCriacaoDto barbeariaRegistro)
//         {

//             var resposta = await _authInterface.RegistrarBarbearia(barbeariaRegistro);
//             return Ok(resposta);
//         }

//         [HttpPost("loginBarbearia")]
//         public async Task<ActionResult> LoginBarbearia(UsuarioLoginDto barbeariaLogin)
//         {

//             var resposta = await _authInterface.LoginBarbearia(barbeariaLogin);
//             return Ok(resposta);
//         }
//     }
// }
