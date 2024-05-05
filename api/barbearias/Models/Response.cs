﻿namespace jwtRegisterLogin.Models
{
    public class Response<T> 
    {
        public object? Dados { get; set; }
        public string Mensagem { get; set; } = string.Empty;
        public bool Status { get; set; } = true;
    }
}

