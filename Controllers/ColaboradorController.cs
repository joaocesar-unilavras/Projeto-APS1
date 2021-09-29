using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetoTeste.Models;

namespace projetoTeste.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ColaboradorController : ControllerBase
    {
        private BDContexto contexto;
        
        public ColaboradorController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
        public List<Colaborador> Listar(string order)
        {
            if(order == "c"){
                return contexto.Colaborador.Include(c => c.IdCargoNavigation).OrderBy(c => c.Id).Select
                (
                    c => new Colaborador 
                    { 
                        Id = c.Id,
                        Nome = c.Nome,
                        Salario = c.Salario,
                        IdCargoNavigation = new Cargo 
                        { 
                            Id = c.IdCargoNavigation.Id, 
                            Nome = c.IdCargoNavigation.Nome,
                            Tipo = c.IdCargoNavigation.Tipo,
                            SalarioMinimo = c.IdCargoNavigation.SalarioMinimo, 
                            SalarioMaximo = c.IdCargoNavigation.SalarioMaximo 
                        } 
                    }
                ).ToList();
            }

            else if(order == "d"){
                return contexto.Colaborador.Include(c => c.IdCargoNavigation).OrderByDescending(c => c.Id).Select
                (
                    c => new Colaborador 
                    { 
                        Id = c.Id,
                        Nome = c.Nome,
                        Salario = c.Salario,
                        IdCargoNavigation = new Cargo 
                        { 
                            Id = c.IdCargoNavigation.Id, 
                            Nome = c.IdCargoNavigation.Nome,
                            Tipo = c.IdCargoNavigation.Tipo,
                            SalarioMinimo = c.IdCargoNavigation.SalarioMinimo, 
                            SalarioMaximo = c.IdCargoNavigation.SalarioMaximo 
                        } 
                    }
                ).ToList();
            }

            else{
                return contexto.Colaborador.Include(c => c.IdCargoNavigation).OrderBy(c => c.Nome).Select
                (
                    c => new Colaborador 
                    { 
                        Id = c.Id,
                        Nome = c.Nome,
                        Salario = c.Salario,
                        IdCargoNavigation = new Cargo 
                        { 
                            Id = c.IdCargoNavigation.Id, 
                            Nome = c.IdCargoNavigation.Nome,
                            Tipo = c.IdCargoNavigation.Tipo,
                            SalarioMinimo = c.IdCargoNavigation.SalarioMinimo, 
                            SalarioMaximo = c.IdCargoNavigation.SalarioMaximo 
                        } 
                    }
                ).ToList();
            }
            
        }

        [HttpGet]
        public List<Colaborador> ListarPorFaixa(double valorInicial, double valorFinal)
        {
            return contexto.Colaborador.Where(c => c.Salario >= valorInicial && c.Salario <= valorFinal).Select
            (
                c => new Colaborador 
                { 
                    Id = c.Id,
                    Nome = c.Nome,
                    Salario = c.Salario,
                    IdCargoNavigation = new Cargo 
                    { 
                        Id = c.IdCargoNavigation.Id, 
                        Nome = c.IdCargoNavigation.Nome,
                        Tipo = c.IdCargoNavigation.Tipo,
                        SalarioMinimo = c.IdCargoNavigation.SalarioMinimo, 
                        SalarioMaximo = c.IdCargoNavigation.SalarioMaximo                     
                    } 
                }).ToList();
        }

        [HttpGet]
        public List<Colaborador> ListarPorCargo(string cargo)
        {
            return contexto.Colaborador.Where(c => c.IdCargoNavigation.Nome == cargo).Select
            (
                c => new Colaborador 
                { 
                    Id = c.Id,
                    Nome = c.Nome,
                    Salario = c.Salario,
                    IdCargoNavigation = new Cargo 
                    { 
                        Id = c.IdCargoNavigation.Id, 
                        Nome = c.IdCargoNavigation.Nome,
                        Tipo = c.IdCargoNavigation.Tipo,
                        SalarioMinimo = c.IdCargoNavigation.SalarioMinimo, 
                        SalarioMaximo = c.IdCargoNavigation.SalarioMaximo                     
                    } 
                }).ToList();
        }

        [HttpPost]
        public string Cadastrar([FromBody]Colaborador dados)
        {
            contexto.Add(dados);
            contexto.SaveChanges();
            
            return "Colaborador cadastrado com sucesso!";
        }
    }
}