using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class ArrumandoAgenda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Agenda");

            migrationBuilder.RenameColumn(
                name: "Servico",
                table: "Agenda",
                newName: "Observacao");

            migrationBuilder.RenameColumn(
                name: "Pago",
                table: "Agenda",
                newName: "Dat_Cad");

            migrationBuilder.AddColumn<bool>(
                name: "Aprovado",
                table: "Agenda",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id_tipo_servico",
                table: "Agenda",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Agenda_Id_tipo_servico",
                table: "Agenda",
                column: "Id_tipo_servico");

            migrationBuilder.CreateIndex(
                name: "IX_Agenda_Id_usuario_dono",
                table: "Agenda",
                column: "Id_usuario_dono");

            migrationBuilder.AddForeignKey(
                name: "FK_Agenda_Servico_Id_tipo_servico",
                table: "Agenda",
                column: "Id_tipo_servico",
                principalTable: "Servico",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Agenda_Usuario_Id_usuario_dono",
                table: "Agenda",
                column: "Id_usuario_dono",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agenda_Servico_Id_tipo_servico",
                table: "Agenda");

            migrationBuilder.DropForeignKey(
                name: "FK_Agenda_Usuario_Id_usuario_dono",
                table: "Agenda");

            migrationBuilder.DropIndex(
                name: "IX_Agenda_Id_tipo_servico",
                table: "Agenda");

            migrationBuilder.DropIndex(
                name: "IX_Agenda_Id_usuario_dono",
                table: "Agenda");

            migrationBuilder.DropColumn(
                name: "Aprovado",
                table: "Agenda");

            migrationBuilder.DropColumn(
                name: "Id_tipo_servico",
                table: "Agenda");

            migrationBuilder.RenameColumn(
                name: "Observacao",
                table: "Agenda",
                newName: "Servico");

            migrationBuilder.RenameColumn(
                name: "Dat_Cad",
                table: "Agenda",
                newName: "Pago");

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Agenda",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
