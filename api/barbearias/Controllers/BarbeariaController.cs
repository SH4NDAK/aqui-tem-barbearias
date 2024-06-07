// using jwtRegisterLogin.Dtos;
// using jwtRegisterLogin.Services.AuthBarbeariaService;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;

// namespace jwtRegisterLogin.Controllers
// {
//     [Route("api/")]
//     [ApiController]
//     public class BarbeariaContoller : ControllerBase
//     {
//         private readonly IAuthBarbeariaInterface _authInterface;
//         public BarbeariaContoller(IAuthBarbeariaInterface authInterface)
//         {
//                 _authInterface = authInterface;
//         }

//         [HttpPut("editarBarbearia/{id}")]
        
//         public async Task<IActionResult> EditarBarbeiro(int id, BarbeariaEdicaoDto barbeariaRegistro)
//         {
//             var response = await _authInterface.EditarBarbearia(id, barbeariaRegistro);

//             if (response.Status == 405)
//             {
//                 return BadRequest(response);
//             }

//             return Ok(response);
//         }

//     }
// }
