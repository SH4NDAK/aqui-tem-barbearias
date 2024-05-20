using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using jwtRegisterLogin.Services.ServicoService; // Adicionado o namespace do ServicoService
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DebuggerDisplay("{GetDebuggerDisplay(),nq}")]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoService _servicoService; // Trocado para IServicoService

        public ServicoController(IServicoService servicoService) // Modificado o parâmetro no construtor
        {
            _servicoService = servicoService;
        }

        [HttpPost("cadastrar")] // Renomeei o endpoint para "cadastrar"
        public async Task<IActionResult> CadastrarServico(ServicoCriacaoDto servicoDto)
        {
            if (servicoDto.UsuarioId == null || servicoDto.UsuarioId == "")
            {
                return BadRequest(new Response<object>
                {
                    Dados = null,
                    Mensagem = "O campo UsuarioId é obrigatório",
                    Status = false
                });
            }
            if (servicoDto.Ativo.ToString() == null || servicoDto.Ativo.ToString() == "")
            {
                return BadRequest(new Response<object>
                {
                    Dados = null,
                    Mensagem = "O campo Ativo é obrigatório",
                    Status = false
                });
            }
            // Chama o ServicoService para criar o serviço
            var response = await _servicoService.CriarServico(servicoDto);

            // Verifica se houve algum erro ao criar o serviço
            if (!response.Status)
            {
                return BadRequest(new Response<object>
                {
                    Dados = null,
                    Mensagem = response.Mensagem,
                    Status = response.Status
                });
            }

            return Ok(new Response<object>
            {
                Dados = null,
                Mensagem = "Serviço cadastrado com sucesso.",
                Status = true
            });
        }

        [HttpGet("ListarServico")]
        public async Task<IActionResult> ListarServico()
        {
            var response = await _servicoService.ListarServico();

            if (!response.Status)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}
