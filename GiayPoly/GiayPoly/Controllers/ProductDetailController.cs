using GiayPoly.DBcontext;
using GiayPoly.Migrations;
using GiayPoly.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailController : ControllerBase
    {
        private readonly DbWebContext _context;
        public ProductDetailController(DbWebContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetList")]
        public IActionResult GetList()
        {
            var productDetails = _context.DetailProducts.ToList();
            if (productDetails != null)
            {
                return Ok(productDetails);
            }
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(Guid id)
        {
            var productDetail = _context.DetailProducts.Find(id);
            if (productDetail != null)
            {
                return Ok(productDetail);
            }
            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("GetByIds")]
        public IActionResult GetByIds([FromBody] List<Guid> ids)
        {
            var productDetail = _context.DetailProducts.Where(x=> ids.Contains(x.Id)).ToList();
            if (productDetail != null)
            {
                return Ok(productDetail);
            }
            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody] Models.DetailProduct input)
        {
            input.Id = new Guid();
            _context.DetailProducts.Add(input);
            _context.SaveChanges();
            return Ok(input);
        }
        [HttpPut]
        [Route("Update")]
        public IActionResult Update(Guid id, [FromBody] Models.DetailProduct input)
        {
            var productDetail = _context.DetailProducts.Find(id);
            if (productDetail != null)
            {
                productDetail.ProductId = productDetail.ProductId;
                productDetail.SizeName = input.SizeName;
                productDetail.Quantity = input.Quantity;
                _context.SaveChanges();
                return Ok(productDetail);
            }
            else { return BadRequest(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(Guid id)
        {
            var productDetail = _context.DetailProducts.Find(id);
            var product = _context.Products.FirstOrDefault(x => x.ListProductDetailId.Contains(id.ToString()));
            if(product != null)
            {
                string[] elements = product.ListProductDetailId.Split(',');

                // Tạo một List để lưu trữ các phần tử sau khi loại bỏ giá trị cần
                List<string> resultElements = new List<string>();

                // Duyệt qua từng phần tử trong mảng và thêm vào List nếu không phải là giá trị cần loại bỏ
                foreach (string element in elements)
                {
                    if (element != id.ToString())
                    {
                        resultElements.Add(element);
                    }
                }

                string result = string.Join(",", resultElements);
                product.ListProductDetailId = result;
                _context.Products.Update(product);
            }
          
            if (productDetail != null)
            {
                _context.DetailProducts.Remove(productDetail);
                _context.SaveChanges();
                return Ok(productDetail);
            }
            else { return BadRequest(null); }
        }
        
    }
}
