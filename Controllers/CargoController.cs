using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projetoTeste.Models;

namespace projetoTeste.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CargoController : ControllerBase
    {
        private BDContexto contexto;
        
        public CargoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
        public List<Cargo> Listar()
        {
            return contexto.Cargo.ToList();
        }

        //Listar apenas cargos de desenvolvedores.
        [HttpGet]
        public List<Cargo> ListarDev()
        {
            return contexto.Cargo.Where(c => c.Tipo == "D").ToList();
        }

        //Retornar o maior salário
        [HttpGet]
        public double MaiorSalario()
        {
            return contexto.Cargo.Max(c => c.SalarioMaximo);
        }

        [HttpDelete]
        public string Excluir([FromBody]int id)
        {
            try
            {
                List<Colaborador> colaboradores = contexto.Colaborador.Where(p => p.IdCargo == id).ToList();

                if (colaboradores.Count() == 0)
                {
                    Cargo dados = contexto.Cargo.FirstOrDefault(p => p.Id == id);

                    contexto.Remove(dados);
                    contexto.SaveChanges();
            
                    return "Cargo excluído com sucesso!";
                }
                else
                {
                    return "Cargo não pode ser excluído, existem colaboradores vinculados a ele!";
                }
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpDelete]
        public string ExcluirLogico([FromBody]int id)
        {
            try
            {
                Cargo dados = contexto.Cargo.FirstOrDefault(p => p.Id == id);

                dados.Excluido = true;
                contexto.Update(dados);
                contexto.SaveChanges();
        
                return "Cargo excluído com sucesso!";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }
    }
}