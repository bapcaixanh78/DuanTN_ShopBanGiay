using GiayPoly.DBcontext;
using GiayPoly.Models;
using Microsoft.AspNetCore.Mvc;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DbWebContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(DbWebContext context, IConfiguration configuration)
        {

            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(Login data)
        {
            var user = _context.Accounts.FirstOrDefault(x => x.Email == data.Email && x.Password == data.Password);

            if (user == null)
            {
                return BadRequest("Khong co ten nguoi dung nay !");
            }

            return Ok(user);
        }
        [HttpPost]
        [Route("createAcount")]
        public async Task<IActionResult> createAcount(Account data)
        {
            var user = _context.Accounts.FirstOrDefault(x => x.Email == data.Email);

            if (user == null)
            {
                _context.Accounts.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }

            return BadRequest("Tài khoản đã tồn tại");
        }
    }
}
