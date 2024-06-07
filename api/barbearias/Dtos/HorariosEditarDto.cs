using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class HorarioEditarDto
    {
        public string? BarbeiroId { get; set; }
        public DateTime? Dia { get; set; }
        public string? HoraMax { get; set; }
        public string? HoraMin { get; set; }
    }
}
