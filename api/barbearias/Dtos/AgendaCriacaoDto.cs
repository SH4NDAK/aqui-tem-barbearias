using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class AgendaCriacaoDto
    {
        public string Observacao { get; set; }

        [Required(ErrorMessage = "O campo horario é obrigatório.")]
        public string Horario { get; set; }

        [Required(ErrorMessage = "O campo data é obrigatório.")]
        public string Data { get; set; }

        [Required(ErrorMessage = "O campo Nome do Cliente é obrigatório.")]
        public string NomeDoCliente { get; set; }

        [Required(ErrorMessage = "O campo Telefone do Cliente é obrigatório.")]
        public int Id_tipo_servico { get; set; }
        public string? NomeTipoServico { get; set; }
        public bool? Aprovado { get; set; }

        public int Id_usuario_dono { get; set; }
    }
}
