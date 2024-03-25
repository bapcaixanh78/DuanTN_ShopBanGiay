
using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.Services;
using GiayPoly.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController :ControllerBase
    {
        private readonly DbWebContext _context;
        private readonly IMapper _mapper;
        private readonly IUploadService _uploadService;
        private readonly IProductService _productService;
        public ProductController(DbWebContext context , IMapper mapper, IUploadService uploadService, IProductService productService)
        {
            _context = context;
            _mapper = mapper;
            _uploadService = uploadService;
            _productService = productService;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList(string? search)
        {
            var products = await _context.Products.ToListAsync() ;
            if (products != null)
            {
                return Ok(products);
            }
            else { return BadRequest(null); }

        }
        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product != null)
            {
                return Ok(product);
            }
            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("SetOderById")]
        public async Task<IActionResult> SetOrderById(List<ListID> input)
        {
            try
            {
                var idList = input.Select(x => x.Id).ToList();
                var productList = await _context.Products.Where(x => idList.Contains(x.Id)).ToListAsync();

                productList.ForEach(p => p.Oder += 1);

                _context.Products.UpdateRange(productList);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Có lỗi xảy ra: ");
            }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(int id, ProductViewModel input)
        {
            var product = await _productService.UpdateProduct(id, input);
            if (product != null)
            {
                return Ok(product);
            }
            else { return BadRequest(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productService.DeleteProduct(id);
            if (product != null)
            {
                return Ok(product);
            }
            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("Create")]
        public async Task<Product> Create(Product input)
        {
            var product = await _productService.CreateProduct(input);
            return product;
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
        [HttpPost]
        [Route("UploadImgs")]
        public async Task<IActionResult> UploadImageAsync(List<IFormFile> files)
        {
            bool isUpload = await _uploadService.UploadMultipleImagesAsync(files);
            if (isUpload)
                return Ok(new mess() { messenger = "true" });
            return BadRequest(new mess() { messenger = "false" });
        }
    }

}
