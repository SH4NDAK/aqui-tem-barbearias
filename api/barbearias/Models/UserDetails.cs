using jwtRegisterLogin.Enum;

namespace jwtRegisterLogin.Models
{
    public class UserDetails
    {
        public string? Token { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public CargoEnum Cargo { get; set; }

    }
}
