using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DbWebContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AccountController(DbWebContext context, IConfiguration configuration, IMapper mapper)
        {

            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(Login data)
        {
            var user = _context.Accounts.FirstOrDefault(x => x.Email == data.Email && x.Password == data.Password);

            if (user == null)
            {
                return Ok(null);
            }

            return Ok(user);
        }
        [HttpGet]
        [Route("GetListUser")]
        public async Task<IActionResult> GetList()
        {
            var user = _context.Accounts.Where(x => x.role != 0).ToList();

            if (user == null)
            {
                return BadRequest("Khong co ten nguoi dung nay !");
            }

            return Ok(user);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(int id)
        {

            var data = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if (data != null)
            {
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetByEmail")]
        public async Task<IActionResult> GetByEmail(string email)
        {

            var data = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);
            if (data != null)
            {
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpPost]
        [Route("resetPass")]
        public async Task<IActionResult> ResetPass(Login input)
        {

            var data = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == input.Email);
            if (data != null)
            {
                data.Password = input.Password;
                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpPost]
        [Route("Lock")]
        public async Task<IActionResult> Lock(int id)
        {
            var user = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null)
            {
                user.role = -1;
                return BadRequest("Khong co ten nguoi dung nay !");
            }

            return Ok(user);
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(int id,AccountViews input)
        {
            var data = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if (data != null)
            {
                _mapper.Map(input, data);
                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return Ok(id);
            }
            else { return Ok(null); }
        }
        [HttpPost]
        [Route("createAcount")]
        public async Task<IActionResult> createAcount(Account data)
        {
            var user = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == data.Email || x.PhoneNumber == data.PhoneNumber);

            if (user == null)
            {
                _context.Accounts.Add(data);
                await _context.SaveChangesAsync();
                return Ok(data);
            }

            return Ok(null);
        }
    }
}
