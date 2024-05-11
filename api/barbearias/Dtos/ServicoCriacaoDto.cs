using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class ServicoCriacaoDto
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo Descrição é obrigatório.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo Duração é obrigatório.")]
        public string Duracao { get; set; }

        [Required(ErrorMessage = "O campo Preço é obrigatório.")]
        public string Preco { get; set; }

        [Required(ErrorMessage = "O campo Nome do Cliente é obrigatório.")]
        public string NomeDoCliente { get; set; }

        [Required(ErrorMessage = "O campo Telefone do Cliente é obrigatório.")]
        public string TelefoneCliente { get; set; }

        [Required(ErrorMessage = "O campo Ativo é obrigatório.")]
        public string Ativo { get; set; }

        public string? Pago { get; set; }

        [Required(ErrorMessage = "O campo UsuarioId é obrigatório.")]
        public string UsuarioId { get; set; } // Chave estrangeira da tabela User
    }
}
