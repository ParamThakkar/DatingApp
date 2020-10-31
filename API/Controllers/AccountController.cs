using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context,ITokenService tokenService)
        {
            _context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x=>x.UserName == loginDto.Username);

            if(user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i=0;i<ComputeHash.Length;i++){
                if(ComputeHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Credentials");
            } 

            return new UserDto{
                Token = tokenService.CreateToken(user),
                username = user.UserName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExist(registerDto.UserName))
                return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser{
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

                       
            return new UserDto{
                Token = tokenService.CreateToken(user),
                username = user.UserName
            };
        }
        public async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName.ToLower()==username.ToLower());
        }
    }
}