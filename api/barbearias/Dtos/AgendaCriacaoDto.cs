using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class AgendaCriacaoDto
    {
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo horario é obrigatório.")]
        public string Horario { get; set; }

        [Required(ErrorMessage = "O campo data é obrigatório.")]
        public string Data { get; set; }

        [Required(ErrorMessage = "O campo Servico do Cliente é obrigatório.")]
        public string Servico { get; set; }

        public string? Ativo { get; set; }

        public string? Pago { get; set; }

        public string UsuarioId { get; set; }
    }
}
