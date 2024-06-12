using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Models
{
    public class ServicoUsuarioModel
    {
        public int Id { get; set; } // Chave primária

        [ForeignKey("Usuario")] // Indica que Id_usuario é uma chave estrangeira para a tabela "Usuario"
        public int Id_usuario { get; set; }

        [ForeignKey("Servico")] // Indica que Id_tipo_servico é uma chave estrangeira para a tabela "Servico"
        public int Id_tipo_servico { get; set; }

        public DateTime Dat_cad { get; set; } = DateTime.Now;
        public bool Ativo { get; set; } = true;

        // Propriedades de navegação
        public UsuarioModel Usuario { get; set; } // Relacionamento com a tabela "Usuario"
        public ServicoModel Servico { get; set; } // Relacionamento com a tabela "Servico"
    }
}
