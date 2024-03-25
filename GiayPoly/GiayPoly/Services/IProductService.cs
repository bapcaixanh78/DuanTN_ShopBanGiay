using GiayPoly.Models;
using GiayPoly.ViewModels;

namespace GiayPoly.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetProductList(string search);
        Task<Product> GetProductById(int id);
        Task SetOrderById(List<int> idList);
        Task<Product> UpdateProduct(int id, ProductViewModel input);
        Task<int?> DeleteProduct(int id);
        Task<Product> CreateProduct(Product input);
    }
}
