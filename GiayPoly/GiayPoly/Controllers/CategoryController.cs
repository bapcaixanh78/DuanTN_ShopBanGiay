using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DbWebContext _context;

        public CategoryController(DbWebContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList(string? search)
        {
            if (search != null)
            {

            }
            var listData = await _context.Categorys.ToListAsync();
            if (listData != null)
            {
                return Ok(listData);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {

            var data = await _context.Categorys.FirstOrDefaultAsync(x => x.Id == id);
            if (data != null)
            {
                return Ok(data);
            }
            else { return Ok(null); }
        }
      
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(Guid id, Category input)
        {
            var data = await _context.Categorys.FirstOrDefaultAsync(x => x.Id == id);
            if (data != null)
            {
                data.Name = input.Name;
                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _context.Categorys.FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return Ok(id);
            }
            else { return Ok(null); }
        }
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(Category input)
        {
            if (input == null)
            {
                return null;
            }
           var check =  await _context.Categorys.FirstOrDefaultAsync(x => x.Name == input.Name);
            if(check != null)
            {
                return null;
            }
            //input.ExpiryView = input.Expiry.ToString("dd/MM/yyyy hh:ss");
            _context.Categorys.Add(input);
            await _context.SaveChangesAsync();

            return Ok(input);

        }
    }
}
