using System.Threading.Tasks;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.BarbeiroService
{
    public interface IBarbeiroInterface
    {
        Task<Response<HorariosModel>> AdicionarHorario(HorarioCriacaoDto horarioDto);
        Task<Response<List<UsuarioCriacaoDto>>> ListarBarbeiros();
        Task<Response<List<UsuarioCriacaoDto>>> ListarUnicoBarbeiro(int Id);
        Task<Response<List<HorariosModel>>> ListarHorarios(ListarHorariosDto horariosDto);

    }
}
