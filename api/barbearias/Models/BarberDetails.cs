using jwtRegisterLogin.Enum;

namespace jwtRegisterLogin.Models
{
    public class BarberDetails
    {
        public string? Token { get; set; }
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string CNPJ { get; set; }
    }
}
