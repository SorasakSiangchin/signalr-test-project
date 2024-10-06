using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using signalr_project_backend.Datas;
using signalr_project_backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace signalr_project_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase 
    {
        private readonly ApplicationDbContext _dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers ()
        {
            try
            {
                return Ok(await _dbContext.Users.ToListAsync());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
