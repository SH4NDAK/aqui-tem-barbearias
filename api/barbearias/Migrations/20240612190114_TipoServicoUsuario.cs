using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class TipoServicoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServicoUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_usuario = table.Column<int>(type: "int", nullable: false),
                    Id_tipo_servico = table.Column<int>(type: "int", nullable: false),
                    Dat_cad = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicoUsuario", x => x.Id);
                    table.UniqueConstraint("AK_ServicoUsuario_Id_usuario_Id_tipo_servico", x => new { x.Id_usuario, x.Id_tipo_servico });
                    table.ForeignKey(
                        name: "FK_ServicoUsuario_Servico_Id_tipo_servico",
                        column: x => x.Id_tipo_servico,
                        principalTable: "Servico",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServicoUsuario_Usuario_Id_usuario",
                        column: x => x.Id_usuario,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServicoUsuario_Id_tipo_servico",
                table: "ServicoUsuario",
                column: "Id_tipo_servico");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServicoUsuario");
        }
    }
}
