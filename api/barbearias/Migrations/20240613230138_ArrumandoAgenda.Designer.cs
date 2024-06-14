﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using jwtRegisterLogin.Data;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240613230138_ArrumandoAgenda")]
    partial class ArrumandoAgenda
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("jwtRegisterLogin.Models.AgendaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("Aprovado")
                        .HasColumnType("bit");

                    b.Property<bool?>("Ativo")
                        .HasColumnType("bit");

                    b.Property<bool?>("Dat_Cad")
                        .HasColumnType("bit");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Horario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Id_tipo_servico")
                        .HasColumnType("int");

                    b.Property<int>("Id_usuario_dono")
                        .HasColumnType("int");

                    b.Property<string>("NomeDoCliente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Observacao")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Id_tipo_servico");

                    b.HasIndex("Id_usuario_dono");

                    b.ToTable("Agenda");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.BarbeariaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Cnpj")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Codigo_auth")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Dat_cad")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Barbearia");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.BarbeariaUsuarioModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Dat_cad")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_barbearia")
                        .HasColumnType("int");

                    b.Property<int>("Id_usuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasAlternateKey("Id_usuario", "Id_barbearia");

                    b.HasIndex("Id_barbearia");

                    b.ToTable("BarbeariaUsuario");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.ServicoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Duracao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("Nome")
                        .IsUnique();

                    b.ToTable("Servico");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.ServicoUsuarioModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Dat_cad")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_tipo_servico")
                        .HasColumnType("int");

                    b.Property<int>("Id_usuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasAlternateKey("Id_usuario", "Id_tipo_servico");

                    b.HasIndex("Id_tipo_servico");

                    b.ToTable("ServicoUsuario");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.TokenModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CriadaEm")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExpiraEm")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TokenDb");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.UsuarioModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Cargo")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("SenhaHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("SenhaSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("TokenDataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Usuario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.AgendaModel", b =>
                {
                    b.HasOne("jwtRegisterLogin.Models.ServicoModel", "Servico")
                        .WithMany()
                        .HasForeignKey("Id_tipo_servico");

                    b.HasOne("jwtRegisterLogin.Models.UsuarioModel", "Usuario")
                        .WithMany()
                        .HasForeignKey("Id_usuario_dono")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Servico");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.BarbeariaUsuarioModel", b =>
                {
                    b.HasOne("jwtRegisterLogin.Models.BarbeariaModel", "Barbearia")
                        .WithMany()
                        .HasForeignKey("Id_barbearia")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("jwtRegisterLogin.Models.UsuarioModel", "Usuario")
                        .WithMany()
                        .HasForeignKey("Id_usuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Barbearia");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("jwtRegisterLogin.Models.ServicoUsuarioModel", b =>
                {
                    b.HasOne("jwtRegisterLogin.Models.ServicoModel", "Servico")
                        .WithMany()
                        .HasForeignKey("Id_tipo_servico")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("jwtRegisterLogin.Models.UsuarioModel", "Usuario")
                        .WithMany()
                        .HasForeignKey("Id_usuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Servico");

                    b.Navigation("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
