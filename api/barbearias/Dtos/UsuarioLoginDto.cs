using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class UsuarioLoginDto
    {
        [Required(ErrorMessage = "O campo login é obrigatório")] 
        [ValidateEmailOrPhoneNumber(ErrorMessage = "Login inválido!")]
        public string Login { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatória")]
        public string Senha { get; set; }
    }
}
