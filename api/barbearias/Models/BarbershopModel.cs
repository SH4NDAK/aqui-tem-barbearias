using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class BarbershopModel
    {
        public int Id { get; set; } 
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string CNPJ { get; set; }    
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }
        public DateTime TokenDataCriacao { get; set; } = DateTime.Now;

    }
}