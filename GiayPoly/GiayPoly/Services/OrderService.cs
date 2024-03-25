using AutoMapper;
using GiayPoly.DBcontext;
using GiayPoly.Models;
using GiayPoly.ViewModels;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace GiayPoly.Services
{
    public class OrderService : IOrderService
    {
        private readonly DbWebContext _context;
        private readonly IMapper _mapper;
        public OrderService(DbWebContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var order = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
            if (order != null)
            {
                _context.Oders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Oder>> GetAllAsync()
        {
            var orders = _context.Oders.ToList();
            if (orders != null)
            {
                return _mapper.Map<List<Oder>>(orders);
            }
            return null;
        }

        public async Task<Oder> GetByIdAsync(Guid id)
        {
            var order = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
            if (order != null)
            {
                return order;
            }
            return null;
        }
        public async Task<List<Oder>> GetByEmailAsync(string email)
        {
            var oder = await _context.Oders.Where(x => x.Email == email).ToListAsync();
            if (oder != null)
            {
                return oder;
            }
            return null;
        }
        /// <summary>
        /// Update order by id and oderView
        /// </summary>
        /// <param name="id"></param>
        /// <param name="oderView"></param>
        /// <returns></returns>

        public async Task<bool> UpdateAsync(Guid id, OderView oderView)
        {
            var oder = await _context.Oders.FirstOrDefaultAsync(x => x.Id == id);
            if (oder != null)
            {
                _mapper.Map(oderView, oder);
                _context.Update(oder);
                // Convert list product string to int
                List<ListProductModel> productList = JsonConvert.DeserializeObject<List<ListProductModel>>(oderView.ListProduct);
                // Get list product from DB
                var productId = productList.Select(x => x.ProductID).ToList();
                var products = _context.Products.Where(x => productId.Contains(x.Id)).ToList();
                // Update quantity product and convert list product detail string to int != null and empty
                var productDetailIds = products.Select(x => x.ListProductDetailId).ToList()
                    .Where(x => !string.IsNullOrEmpty(x))
                    .ToList();
                // use split to convert string to list Guid ,
                var split = productDetailIds.Select(x => x.Split(",")).ToList();
                // convert list string to list Guid
                var productDetailIdsGuid = split.SelectMany(x => x).Select(x => Guid.Parse(x)).ToList();
                if (productDetailIdsGuid.Any() && oderView.Status == (int)StatusEnums.Success)
                {
                    // Convert string to Guid
                    var productDetails = _context.DetailProducts.Where(x => productDetailIdsGuid.Contains(x.Id)).ToList();
                    foreach (var product in products)
                    {
                        product.Quantity -= 1;
                        foreach (var productDetail in productDetails)
                        {
                            if(product.Id == productDetail.ProductId)
                            {
                                productDetail.Quantity -= 1;
                                _context.Update(productDetail);
                            }
                            
                        }
                        
                    }
                
                }
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Oder> CreateAsync(Oder oder)
        {
            if (oder == null)
            {
                return null;
            }
            if (oder.VoucherCode != "")
            {
                var voucher = await _context.Vouchers.FirstOrDefaultAsync(x => x.Code == oder.VoucherCode);
                if (voucher != null)
                {
                    if (voucher.TurnUseVoucher > 0) voucher.TurnUseVoucher -= 1;
                    _context.Update(voucher);
                }
            }
            var user = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == oder.UserName);
            if (user != null)
            {
                oder.PhoneNumber = user.PhoneNumber;
                oder.UserName = user.UserName;
                oder.Email = user.Email;
                oder.DayOder = DateTime.UtcNow.Date.ToString("dd/MM/yyyy HH:mm");
            }
            _context.Oders.Add(oder);
            await _context.SaveChangesAsync();
            return oder;
        }
    }
}
