﻿using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.AuthService
{
    public interface IAuthInterface
    {
        Task<Response<UsuarioCriacaoDto>> Registrar(UsuarioCriacaoDto usuarioRegistro);
        Task<Response<string>> Login(UsuarioLoginDto usuarioLogin);
        Task<Response<UsuarioEdicaoDto>> EditarUsuario(int id, UsuarioEdicaoDto usuarioRegistro);

        Task<Response<string>> ExcluirUsuario(int id);
    }
}

