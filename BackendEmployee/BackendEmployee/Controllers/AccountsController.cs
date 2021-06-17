using BackendEmployee.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackendEmployee.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController: ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;

        public AccountsController(UserManager<IdentityUser> userManager, 
            IConfiguration configuration,
            SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponseDto>> Create([FromBody] UserCredentialDto userCredentialDto)
        {
            var user = new IdentityUser { UserName = userCredentialDto.Email, Email = userCredentialDto.Email };
            var result = await userManager.CreateAsync(user, userCredentialDto.Password);

            if (result.Succeeded)
            {
                return await TokenBuild(userCredentialDto);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]

        public async Task<ActionResult<AuthenticationResponseDto>> Login([FromBody] UserCredentialDto userCredentialDto)
        {
            var result = await signInManager.PasswordSignInAsync(userCredentialDto.Email, userCredentialDto.Password,
                        isPersistent: false, lockoutOnFailure: false);

            if(result.Succeeded)
            {
                return await TokenBuild(userCredentialDto);
            }
            else
            {
                return BadRequest("Failure Login");
            }
        }

        private async Task<AuthenticationResponseDto> TokenBuild(UserCredentialDto userCredentialDto)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentialDto.Email)
            };

            var user = await userManager.FindByEmailAsync(userCredentialDto.Email);
            var claimsDB = await userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                        expires: expiration, signingCredentials: creds);

            return new AuthenticationResponseDto()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
