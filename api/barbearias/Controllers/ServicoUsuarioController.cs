using jwtRegisterLogin.Services.ServicoUsuarioService; // Adicionado o namespace do ServicoService
using Microsoft.AspNetCore.Mvc;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicoUsuarioController : ControllerBase
    {
        private readonly IServicoUsuarioService _servicoService;

        public ServicoUsuarioController(IServicoUsuarioService servicoService) // Modificado o parâmetro no construtor
        {
            _servicoService = servicoService;
        }


    }
}
