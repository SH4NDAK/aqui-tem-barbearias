using jwtRegisterLogin.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class UsuarioCriacaoDto
    {
        [Required(ErrorMessage = "O campo usuário é obrigatório")]
        public string Usuario { get; set; }

        [Required(ErrorMessage = "O campo email é obrigatório")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo telefone é obrigatório!")]
        public string Telefone { get; set;}

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O campo cargo é obrigatório")]
        public CargoEnum Cargo { get; set; }
    }
}
