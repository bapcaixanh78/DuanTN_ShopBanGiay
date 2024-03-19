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
    public class VoucherController : ControllerBase
    {

        private readonly DbWebContext _context;
        private readonly IMapper _mapper;
        public VoucherController(DbWebContext context, IMapper mapper)
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
            var listData = await _context.Vouchers.ToListAsync();
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

            var data = await _context.Vouchers.FirstOrDefaultAsync(x => x.Id == id);
            if (data != null)
            {
                return Ok(data);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetByCode")]
        public async Task<IActionResult> GetByCode(string code)
        {

            var voucher = await _context.Vouchers.FirstOrDefaultAsync(x => x.Code == code);
            if (voucher != null)
            {
                return Ok(voucher);
            }
            else { return Ok(null); }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(Guid id,voucherView input)
        {
            var data = await _context.Vouchers.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _context.Vouchers.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task<IActionResult> Create(Voucher input)
        {
            if (input == null)
            {
                return null;
            }
            //input.ExpiryView = input.Expiry.ToString("dd/MM/yyyy hh:ss");
            _context.Vouchers.Add(input);
            await _context.SaveChangesAsync();

            return Ok(input) ;

        }
    }
}
