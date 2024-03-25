using GiayPoly.Models;
using GiayPoly.ViewModels;

namespace GiayPoly.Services
{
    public interface IOrderService
    {
        Task<bool> UpdateAsync(Guid id, OderView oderView);
        Task<bool> DeleteAsync(Guid id);
        Task<List<Oder>> GetAllAsync();
        Task<Oder> GetByIdAsync(Guid id);
        Task<List<Oder>> GetByEmailAsync(string email);
        Task<Oder> CreateAsync(Oder oder);
    }
}
