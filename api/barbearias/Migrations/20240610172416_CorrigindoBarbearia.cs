using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class CorrigindoBarbearia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BarbeariaModels",
                table: "BarbeariaModels");

            migrationBuilder.RenameTable(
                name: "BarbeariaModels",
                newName: "Barbearia");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Barbearia",
                table: "Barbearia",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Barbearia",
                table: "Barbearia");

            migrationBuilder.RenameTable(
                name: "Barbearia",
                newName: "BarbeariaModels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BarbeariaModels",
                table: "BarbeariaModels",
                column: "Id");
        }
    }
}
