using System.ComponentModel.DataAnnotations.Schema;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class AgendaModel
    {
        public int Id { get; set; }

        [ForeignKey("Usuario")] // Indica que Id_usuario é uma chave estrangeira para a tabela "Usuario"
        public int Id_usuario_dono { get; set; }

        [ForeignKey("Servico")] // Indica que Id_usuario é uma chave estrangeira para a tabela "Usuario"
        public int? Id_tipo_servico { get; set; }
        public string? Observacao { get; set; }
        public string Data { get; set; }
        public string Horario { get; set; }
        public string NomeDoCliente { get; set; }
        public bool? Aprovado { get; set; }
        public bool? Ativo { get; set; } = true;
        public bool? Dat_Cad { get; set; } = true;


        public UsuarioModel Usuario { get; set; } // Relacionamento com a tabela "Usuario"
        public ServicoModel Servico { get; set; } // Relacionamento com a tabela "Barbearia"
    }
}