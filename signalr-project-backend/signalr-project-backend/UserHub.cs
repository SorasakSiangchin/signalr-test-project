using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using signalr_project_backend.Datas;
using signalr_project_backend.Models;

namespace signalr_project_backend
{
    public class UserHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public UserHub(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddUser(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("ReceiveUsers", await _context.Users.ToListAsync());
        }
    }
}
