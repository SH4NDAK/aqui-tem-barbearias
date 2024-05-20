using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class ServicoModel
    {
        public int Id { get; set; } 
        public string Nome { get; set; } 
        public string Descricao { get; set; } 
        public string Duracao { get; set; } 
        public decimal Preco { get; set; }
        public bool Ativo { get; set; }
        public int UsuarioId { get; set; } // FK da tabela User
    }
}