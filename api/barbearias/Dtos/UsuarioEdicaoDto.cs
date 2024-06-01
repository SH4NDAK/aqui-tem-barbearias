using jwtRegisterLogin.Enum;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class UsuarioEdicaoDto
    {
        public string? Usuario { get; set; }
        public string? Email { get; set; }
        public string? Senha { get; set; }
    }
}