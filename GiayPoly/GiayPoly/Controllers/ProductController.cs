
using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController :ControllerBase
    {
        private readonly DbWebContext _context;
        private readonly IMapper _mapper;
        public ProductController(DbWebContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList(string? search)
        {
            if(search != null)
            {

            }
            var listProduct = await _context.Products.ToListAsync();
            if(listProduct != null)
            {
                return Ok(listProduct);
            }
            else { return Ok(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(int id)
        {

            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                return Ok(product);
            }
            else { return Ok(null); }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(int id, ProductViewModel input)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                _mapper.Map(input,product);
                product.ImgSlug = "product";
                _context.Update(product);
                await _context.SaveChangesAsync(); 
                return Ok(product);
            }
            else { return Ok(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task<Product> Create(Product input)
        {
            if (input== null)
            {
                return null;
            }
            input.ImgSlug = "product";
             _context.Products.Add(input);
            await _context.SaveChangesAsync();
           
            return input;
        }
        [HttpPost]
        [Route("UploadImg")]
        public async Task<IActionResult> UploadImageAsync()
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                var folderPath = Path.Combine("wwwroot\\media\\product");
                var pathToSave = Path.Combine(folderPath);
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

            }
            return Ok(new mess() { messenger = "true" });
        }
    }

}
