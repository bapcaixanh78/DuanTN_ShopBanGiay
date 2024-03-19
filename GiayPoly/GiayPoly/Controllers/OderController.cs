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
    public class OderController : ControllerBase
    {

        private readonly DbWebContext _context;
        private readonly IMapper _mapper;
        public OderController(DbWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList(string? search)
        {
            if (search != null)
            {

            }
            var listOder = await _context.Oders.ToListAsync();
            if (listOder != null)
            {
                return Ok(listOder);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {

            var oder = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
            if (oder != null)
            {
                return Ok(oder);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetByEmail")]
        public async Task<IActionResult> GetById(string email)
        {

            var oder = await _context.Oders.Where(x => x.UserName == email).ToListAsync();
            if (oder != null)
            {
                return Ok(oder);
            }
            else { return Ok(null); }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(Guid id, OderView input)
        {
            var oder = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
            if (oder != null)
            {
                _mapper.Map(input,oder);
                _context.Update(oder);
                await _context.SaveChangesAsync();
                return Ok(oder);
            }
            else { return Ok(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task<Oder> Create(Oder input)
        {
            if (input == null)
            {
                return null;
            }
            var user = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == input.UserName);
            input.PhoneNumber = user.PhoneNumber;
            input.UserName = user.UserName;
            input.Email = user.Email;
            input.DayOder = DateTime.UtcNow.Date.ToString("dd/MM/yyyy HH:mm");
            _context.Oders.Add(input);
            await _context.SaveChangesAsync();

            return input;
        }
    }
}
