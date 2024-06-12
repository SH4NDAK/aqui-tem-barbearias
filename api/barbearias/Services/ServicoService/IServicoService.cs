using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using System.Threading.Tasks;

namespace jwtRegisterLogin.Services.ServicoService
{
    public interface IServicoService
    {
        Task<Response<ServicoCriacaoDto>> CriarServico(ServicoCriacaoDto servicoDto);
        Task<Response<List<ServicoCriacaoDto>>> ListarServico();

        Task<Response<ServicoCriacaoDto>> EditarServico(int id, ServicoCriacaoDto servicoDto);

        Task<Response<List<ServicoCriacaoDto>>> ListarUnicoServico(int Id);
    
        Task<Response<List<ServicoCriacaoDto>>> ListByBarbeiro(int Id);
    }
}

