using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace GiayPoly.Services
{
    public class ProductService : IProductService
    {
        private readonly DbWebContext _context;
        private readonly IMapper _mapper;

        public ProductService(DbWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Product>> GetProductList(string search)
        {
            if (!string.IsNullOrEmpty(search))
            {
                // Implement search functionality if needed
            }
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task SetOrderById(List<int> idList)
        {
            try
            {
                var productList = await _context.Products.Where(x => idList.Contains(x.Id)).ToListAsync();
                productList.ForEach(p => p.Oder += 1);
                await _context.SaveChangesAsync();
            }
          
            catch (Exception ex) { }
        }

        public async Task<Product> UpdateProduct(int id, ProductViewModel input)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            var listProductDetailIds = input.ListProductDetailId.Split(',').Select(Guid.Parse).ToList();
            var productDetails = _context.DetailProducts.Where(x => listProductDetailIds.Contains(x.Id)).ToList();

            var sizes = "";
            foreach (var productDetail in productDetails)
            {
                if (productDetail.ProductId == 0)
                {
                    productDetail.ProductId = id;

                    _context.Update(productDetail);
                }
                // concat size name ","
                sizes += productDetail.SizeName + ",";
            }
            // find product by id
            if (product != null)
            {
                // if  character is "," replace by "" last character
                product.Sizes = sizes.TrimEnd(',');
                _context.Update(product);
            }
            if (product != null)
            {
                _mapper.Map(input, product);
                product.ImgSlug = "product";
                _context.Update(product);
                await _context.SaveChangesAsync();
                return product;
            }
            return null;
        }

        public async Task<int?> DeleteProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            var productDetails =  _context.DetailProducts.Where(i => i.ProductId == id).ToList();
            if(productDetails.Count > 0)
            {
                _context.RemoveRange(productDetails);
            }
            if (product != null)
            {
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return id;
            }
            return null;
        }

        public async Task<Product> CreateProduct(Product input)
        {
            if (input == null)
            {
                return null;
            }
           
            input.ImgSlug = "product";
            _context.Products.Add(input);
            await _context.SaveChangesAsync();
            // convert list product detail string to int != null and empty
            var listProductDetailIds = input.ListProductDetailId.Split(',').Select(Guid.Parse).ToList();
            var productDetails = _context.DetailProducts.Where(x => listProductDetailIds.Contains(x.Id)).ToList();

            var sizes = "";
            foreach (var productDetail in productDetails)
            {
                if (productDetail.ProductId == 0)
                {
                    productDetail.ProductId = input.Id;
                    
                    _context.Update(productDetail);
                }
                // concat size name ","
                sizes += productDetail.SizeName + ",";
            }
            // find product by id
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == input.Id);
            if (product != null)
            {
                // if  character is "," replace by "" last character
                product.Sizes = sizes.TrimEnd(',');
                _context.Update(product);
            }

            await _context.SaveChangesAsync();
            return input;
        }
    }

}
