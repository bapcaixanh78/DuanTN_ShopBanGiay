using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.Services;
using GiayPoly.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OderController : ControllerBase
    {
        private readonly IOrderService  _orderService;
        public OderController( IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList(string? search)
        {
           var orders = await _orderService.GetAllAsync();
            if (orders != null)
            {
                return Ok(orders);
            }
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var oder = await  _orderService.GetByIdAsync(id);
            if (oder != null)
            {
                return Ok(oder);
            }
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetByEmail")]
        public async Task<IActionResult> GetById(string email)
        {
            var oder = await _orderService.GetByEmailAsync(email);
            if (oder != null)
            {
                return Ok(oder);
            }
            else { return BadRequest(null); }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(Guid id, OderView input)
        {
            var result = await _orderService.UpdateAsync(id, input);
            if (result)
            {
                return Ok(input);
            }
            else { return BadRequest(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _orderService.DeleteAsync(id);
            if (result)
            {
                return Ok();
            }
            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("Create")]
        public async Task<Oder> Create(Oder input)
        {
            var result = await _orderService.CreateAsync(input);
            if (result != null)
            {
                return result;
            }
            return null;
        }
    }
}
