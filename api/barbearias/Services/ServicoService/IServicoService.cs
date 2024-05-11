using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using System.Threading.Tasks;

namespace jwtRegisterLogin.Services.ServicoService
{
    public interface IServicoService
    {
        Task<Response<ServicoCriacaoDto>> CriarServico(ServicoCriacaoDto servicoDto);
        Task<Response<List<ServicoCriacaoDto>>> ListarServico();
    }
}

