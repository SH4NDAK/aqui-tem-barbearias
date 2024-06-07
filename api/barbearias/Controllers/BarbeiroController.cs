using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Services.BarbeiroService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class BarbeiroContoller : ControllerBase
    {
        private readonly IBarbeiroInterface _barbeiroInterface;
        public BarbeiroContoller(IBarbeiroInterface authInterface)
        {
            _barbeiroInterface = authInterface;
        }

        [HttpPost("AdicionarHorario")]
        public async Task<IActionResult> AdicionarHorario(HorarioCriacaoDto horarioDto)
        {
            var response = await _barbeiroInterface.AdicionarHorario(horarioDto);

            if (response.Status == 405)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
        [HttpGet("ListarBarbeiro")]
        public async Task<IActionResult> ListarBarbeiros()
        {
            var response = await _barbeiroInterface.ListarBarbeiros();

            if (response.Status == 405)
            {
                return BadRequest(response);
            }
            
            return Ok(response);
        }

        [HttpGet("ListarUnicoBarbeiro/{id}")]
        public async Task<IActionResult> ListarUnicoBarbeiro(int id)
        {
            var response = await _barbeiroInterface.ListarUnicoBarbeiro(id);

            if (response.Status == 405)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("ListarHorarios")]
        public async Task<IActionResult> ListarHorarios([FromQuery] ListarHorariosDto horariosDto)
        {
            var response = await _barbeiroInterface.ListarHorarios(horariosDto);

            if (response.Status == 405)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }


    }
}
