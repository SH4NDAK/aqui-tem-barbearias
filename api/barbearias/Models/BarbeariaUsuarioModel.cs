using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class BarbeariaUsuarioModel
    {
        public int Id { get; set; } // Primary key
        public int Id_usuario { get; set; }
        public int Id_barbearia { get; set; }
        public DateTime Dat_cad { get; set; } = DateTime.Now;
        public bool Ativo { get; set; } = true;
    }
}