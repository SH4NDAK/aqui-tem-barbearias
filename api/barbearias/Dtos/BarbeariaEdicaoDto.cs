    using System;
    using System.ComponentModel.DataAnnotations;

    namespace jwtRegisterLogin.Dtos
    {
        public class BarbeariaEdicaoDto
        {
            public string? Nome { get; set; }
            public string? Email { get; set; }
            public string? Telefone { get; set; }
            public string? CNPJ { get; set; }
            public string? Senha { get; set; }
        }
    }
