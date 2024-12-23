﻿using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Patient
{
    [Route("api/patient/result")]
    [ApiController]
    [Authorize(Roles ="3")]
    public class ResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResultController(ApplicationDbContext context)
        {
            _context = context;
        }
		[HttpGet("myresults")]
		public async Task<IActionResult> GetMyResults()
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bulunamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);

			var myResults = await _context.Results
				.Where(a => a.PatientId == userId)
				.OrderBy(a => a.CreatedDate)
				.ToListAsync();

			if (myResults == null || !myResults.Any())
				return NotFound(new { message = "Veri bulunamadı." });

			// Sonuçların döndürüleceği veriyi oluşturuyoruz
			var resultData = myResults.Select(result => new
			{
				result.ResultId,
				CreatedDate = result.CreatedDate.ToString("yyyy-MM-dd"),
				result.Message
			}).ToList();
            //Console.WriteLine(userId);
			return Ok(resultData);
		}



		[HttpGet("myresult/{id}")]
        public async Task<IActionResult> GetMyResult(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı bulunamadı." });
            }
            var userId = int.Parse(userIdClaim.Value);

            var result = await _context.Results
                .FirstOrDefaultAsync(a => a.ResultId == id && a.PatientId == userId);

            if (result == null)
            {
                return NotFound(new { message = "Sonuç bulunamadı." });
            }
            return Ok(result);
        }
    }
}
