using System.Threading.Tasks;
using jwtRegisterLogin.Data;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using jwtRegisterLogin.Enum;

namespace jwtRegisterLogin.Services.BarbeiroService

{
    public class BarbeiroService : IBarbeiroInterface
    {
        private readonly AppDbContext _context;

        public BarbeiroService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response<HorariosModel>> AdicionarHorario(HorarioCriacaoDto horarioDto)
        {
            var respostaServico = new Response<HorariosModel>();

            try 
            {   
                var usuario = await _context.Usuario.FindAsync(int.Parse(horarioDto.BarbeiroId));

                if (usuario == null)
                {
                    respostaServico.Mensagem = "Barbeiro não encontrada.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }
                if (TimeSpan.Parse(horarioDto.HoraMax) <= TimeSpan.Parse(horarioDto.HoraMin))
                {
                    respostaServico.Mensagem = "Horario Inválido.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }

                var horarios = await _context.Horarios.FirstOrDefaultAsync(h => h.Dia == horarioDto.Dia);

                if (horarios != null)
                {
                    respostaServico.Mensagem = "Dia já criado.";
                    respostaServico.Status = 405;
                    return respostaServico;
                }


                var horario = new HorariosModel
                {
                    BarbeiroId = int.Parse(horarioDto.BarbeiroId),
                    Dia = horarioDto.Dia,
                    HoraMax = horarioDto.HoraMax,
                    HoraMin = horarioDto.HoraMin
                };

                _context.Horarios.Add(horario);
                await _context.SaveChangesAsync();

                respostaServico.Dados = horario;
                respostaServico.Mensagem = "Horário adicionado com sucesso.";
                respostaServico.Status = 200;
                
            }
            catch (Exception ex)
            {
                respostaServico.Mensagem = ex.Message;
                respostaServico.Status = 405;
            }

            return respostaServico;
        }

        async public Task<Response<List<UsuarioCriacaoDto>>> ListarBarbeiros()
        {
            Response<List<UsuarioCriacaoDto>> response = new Response<List<UsuarioCriacaoDto>>();
            
            try
            {
                var barbeiros = await _context.Usuario
                                .Where(u => u.Cargo == CargoEnum.Barbeiro)
                                .ToListAsync();


                if (barbeiros.Count == 0)
                {
                    response.Mensagem = "Nenhum barbeiro encontrado.";
                    response.Status = 405;
                    return response;
                }
                
                var resultado = barbeiros.Select(barbeiro => new
                {
                    Id = barbeiro.Id,
                    Nome = barbeiro.Usuario,
                    Email = barbeiro.Email,
                    Telefone = barbeiro.Telefone,
                    Cargo = barbeiro.Cargo
                }).ToList();

                response.Dados = resultado;
                response.Mensagem = "Barbeiros exibidos com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
            
        }

        async public Task<Response<List<UsuarioCriacaoDto>>> ListarUnicoBarbeiro(int Id)
        {
            Response<List<UsuarioCriacaoDto>> response = new Response<List<UsuarioCriacaoDto>>();
            
                try
                {
                    var barbeiros = await _context.Usuario
                                    .Where(u => u.Cargo == CargoEnum.Barbeiro && u.Id == Id)
                                    .ToListAsync();


                    if (barbeiros.Count == 0)
                    {
                        response.Mensagem = "Nenhum barbeiro encontrado.";
                        response.Status = 405;
                        return response;
                    }
                    
                    var resultado = barbeiros.Select(barbeiro => new
                    {
                        Id = barbeiro.Id,
                        Nome = barbeiro.Usuario,
                        Email = barbeiro.Email,
                        Telefone = barbeiro.Telefone,
                        Cargo = barbeiro.Cargo
                    }).ToList();

                    response.Dados = resultado;
                    response.Mensagem = "Barbeiros exibidos com sucesso.";
                    response.Status = 200;
                }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;
            
        }

        async public Task<Response<List<HorariosModel>>> ListarHorarios(ListarHorariosDto horariosDto)
        {
            Response<List<HorariosModel>> response = new Response<List<HorariosModel>>();
            
            try
            {
                var horarios = await _context.Horarios.FirstOrDefaultAsync(u => u.BarbeiroId == int.Parse(horariosDto.BarbeiroId) && u.Dia == DateTime.Parse(horariosDto.Dia) );
    
                if (horarios == null)
                {
                    response.Mensagem = "Nenhum horário encontrado para o barbeiro neste dia.";
                    response.Status = 405; 
                    return response;
                }
                
                response.Dados = horarios;
                response.Mensagem = "Horários listados com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 405;
            }

            return response;    
        }

        public async Task<Response<HorariosModel>> EditarHorario(int Id, HorarioCriacaoDto horarioDto)
        {
            var response = new Response<HorariosModel>();

            try
            {
                // Verifica se o horário existe
                var horarioExistente = await _context.Horarios.FindAsync(Id);

                if (horarioExistente == null)
                {
                    response.Mensagem = "Horário não encontrado.";
                    response.Status = 404;
                    return response;
                }

                // Verifica se o BarbeiroId foi alterado
                if (horarioDto.BarbeiroId != null && horarioDto.BarbeiroId != horarioExistente.BarbeiroId)
                {
                    var barbeiroExistente = await _context.Usuario.FindAsync(horarioDto.BarbeiroId);
                    if (barbeiroExistente == null)
                    {
                        response.Mensagem = "Barbeiro não encontrado.";
                        response.Status = 405;
                        return response;
                    }
                    // Atualiza o BarbeiroId
                    horarioExistente.BarbeiroId = horarioDto.BarbeiroId;
                }

                // Verifica se o Dia foi alterado
                if (horarioDto.Dia != null && horarioDto.Dia != horarioExistente.Dia)
                {
                    var diaExistente = await _context.Horarios.FirstOrDefaultAsync(h => h.Dia == horarioDto.Dia);
                    if (diaExistente != null)
                    {
                        response.Mensagem = "Já existe um horário para este dia.";
                        response.Status = 405;
                        return response;
                    }
                    // Atualiza o Dia
                    horarioExistente.Dia = horarioDto.Dia;
                }

                // Verifica se HoraMax e HoraMin foram alterados
                if (horarioDto.HoraMax != null || horarioDto.HoraMin != null)
                {
                    // Verifica se as horas são válidas
                    if (horarioDto.HoraMax != null && horarioDto.HoraMin != null)
                    {
                        var horaMax = TimeSpan.Parse(horarioDto.HoraMax);
                        var horaMin = TimeSpan.Parse(horarioDto.HoraMin);

                        if (horaMax <= horaMin)
                        {
                            response.Mensagem = "HoraMax deve ser posterior a HoraMin.";
                            response.Status = 405;
                            return response;
                        }
                    }
                    // Atualiza HoraMax e HoraMin
                    horarioExistente.HoraMax = horarioDto.HoraMax;
                    horarioExistente.HoraMin = horarioDto.HoraMin;
                }

                await _context.SaveChangesAsync();

                response.Dados = horarioExistente;
                response.Mensagem = "Horário editado com sucesso.";
                response.Status = 200;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = 500;
            }

            return response;
        }

    }
}

