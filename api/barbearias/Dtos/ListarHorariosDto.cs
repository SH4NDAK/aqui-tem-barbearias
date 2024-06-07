using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class ListarHorariosDto
    {
        [Required(ErrorMessage = "O campo Barbeiro é obrigatório.")]
        public string BarbeiroId { get; set; }

        [Required(ErrorMessage = "O campo Dia é obrigatório.")]
        public string Dia { get; set; }

    }
}
