﻿using jwtRegisterLogin.Enum;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    //Modelo de Criacao do Usuario
    public class UsuarioCriacaoDto
    {
        [Required(ErrorMessage = "O campo usuário é obrigatório")]
        public string Usuario { get; set; }

        [Required(ErrorMessage = "O campo email é obrigatório"), EmailAddress(ErrorMessage = "Email inválido!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        public string Senha { get; set; }
        [Required(ErrorMessage = "O campo cargo é obrigatório")]
        public CargoEnum Cargo { get; set; }
    }
}
