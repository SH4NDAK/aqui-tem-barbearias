using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class AgendaStatusDTO
    {
        public string Observacao { get; set; }

        public string Horario { get; set; }

        public string Data { get; set; }

        public string NomeDoCliente { get; set; }

        public int Id_tipo_servico { get; set; }
        public string? NomeTipoServico { get; set; }
        public bool Aprovado { get; set; }

        public int Id_usuario_dono { get; set; }
    }
}
