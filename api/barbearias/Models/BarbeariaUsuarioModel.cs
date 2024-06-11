using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Models
{
    public class BarbeariaUsuarioModel
    {
        public int Id { get; set; } // Chave primária

        [ForeignKey("Usuario")] // Indica que Id_usuario é uma chave estrangeira para a tabela "Usuario"
        public int Id_usuario { get; set; }

        [ForeignKey("Barbearia")] // Indica que Id_barbearia é uma chave estrangeira para a tabela "Barbearia"
        public int Id_barbearia { get; set; }

        public DateTime Dat_cad { get; set; } = DateTime.Now;
        public bool Ativo { get; set; } = true;

        // Propriedades de navegação
        public UsuarioModel Usuario { get; set; } // Relacionamento com a tabela "Usuario"
        public BarbeariaModel Barbearia { get; set; } // Relacionamento com a tabela "Barbearia"
    }
}
