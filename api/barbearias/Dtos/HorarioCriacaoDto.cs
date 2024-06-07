using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class HorarioCriacaoDto
    {
        [Required(ErrorMessage = "O Barbeiro é obrigátorio.")]
        public string BarbeiroId { get; set; }

        [Required(ErrorMessage = "O campo Dia é obrigatório.")]
        public DateTime Dia { get; set; }

        [Required(ErrorMessage = "O campo Horario Máximo é obrigatório.")]
        public string HoraMax { get; set; }

        [Required(ErrorMessage = "O campo Horario Minimo é obrigatório.")]
        public string HoraMin { get; set; }
    }
}
