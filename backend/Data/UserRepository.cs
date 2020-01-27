using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.Data;
using BackEnd.Helpers;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<Grocery> GetGroceries(int userId, string model, PagingParams groceryParams)
        {
            var groceries = _context.Groceries
                .Where(g => g.userId == userId)
                .OrderBy(global => g.Department);

            return groceries;
        }

        public async Task<Grocery> GetUniqueGrocery(int id)
        {
            var groceries = await _context.Groceries
                .FirstOrDefaultAsync(c => c.Id == id);

            return groceries;
        }
    }
}