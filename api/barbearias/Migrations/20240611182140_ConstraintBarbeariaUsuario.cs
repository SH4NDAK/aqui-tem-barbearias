using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class ConstraintBarbeariaUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BarbeariaUsuario_Id_barbearia",
                table: "BarbeariaUsuario",
                column: "Id_barbearia");

            migrationBuilder.CreateIndex(
                name: "IX_BarbeariaUsuario_Id_usuario",
                table: "BarbeariaUsuario",
                column: "Id_usuario");

            migrationBuilder.AddForeignKey(
                name: "FK_BarbeariaUsuario_Barbearia_Id_barbearia",
                table: "BarbeariaUsuario",
                column: "Id_barbearia",
                principalTable: "Barbearia",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BarbeariaUsuario_Usuario_Id_usuario",
                table: "BarbeariaUsuario",
                column: "Id_usuario",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BarbeariaUsuario_Barbearia_Id_barbearia",
                table: "BarbeariaUsuario");

            migrationBuilder.DropForeignKey(
                name: "FK_BarbeariaUsuario_Usuario_Id_usuario",
                table: "BarbeariaUsuario");

            migrationBuilder.DropIndex(
                name: "IX_BarbeariaUsuario_Id_barbearia",
                table: "BarbeariaUsuario");

            migrationBuilder.DropIndex(
                name: "IX_BarbeariaUsuario_Id_usuario",
                table: "BarbeariaUsuario");
        }
    }
}
