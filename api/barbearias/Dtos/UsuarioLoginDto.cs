using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class UsuarioLoginDto
    {
        [Required(ErrorMessage = "O campo email é obrigatório"), ValidateEmailOrPhoneNumber(ErrorMessage = "Email ou número de telefone inválido!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatória")]
        public string Senha { get; set; }
    }
}
