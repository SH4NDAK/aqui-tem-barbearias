using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class ArrumandoConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BarbeariaUsuario_Id_usuario",
                table: "BarbeariaUsuario");

            migrationBuilder.DropColumn(
                name: "UniqueCombination",
                table: "BarbeariaUsuario");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_BarbeariaUsuario_Id_usuario_Id_barbearia",
                table: "BarbeariaUsuario",
                columns: new[] { "Id_usuario", "Id_barbearia" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_BarbeariaUsuario_Id_usuario_Id_barbearia",
                table: "BarbeariaUsuario");

            migrationBuilder.AddColumn<int>(
                name: "UniqueCombination",
                table: "BarbeariaUsuario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BarbeariaUsuario_Id_usuario",
                table: "BarbeariaUsuario",
                column: "Id_usuario");
        }
    }
}
