using IPL_API.DAO;
using IPL_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IPL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IPLController : ControllerBase
    {
        private readonly IRepository _repository;

        public IPLController(IRepository repository)
        {
            _repository = repository;
        }

        // 1. Add a new player
        [HttpPost("add-player")]
        public async Task<IActionResult> AddPlayer([FromBody] Player player)
        {
            if (player == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var newPlayerId = await _repository.AddPlayerAsync(player);
                return Ok(new { PlayerId = newPlayerId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // 2. Retrieve detailed statistics for each match, including team names, venue, match date, and total number of fan engagements
        [HttpGet("match-details-with-engagements")]
        public async Task<IActionResult> GetMatchDetailsWithFanEngagement()
        {
            try
            {
                var matchDetails = await _repository.GetMatchDetailsWithFanEngagementAsync();
                return Ok(matchDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // 3. Retrieve top 5 players based on the number of matches played and highest fan engagements
        [HttpGet("top-players")]
        public async Task<IActionResult> GetTopPlayersWithHighestFanEngagement([FromQuery] int topPlayersCount = 5)
        {
            try
            {
                var topPlayers = await _repository.GetTopPlayersWithHighestFanEngagementAsync(topPlayersCount);
                return Ok(topPlayers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // 4. Retrieve all matches played within a specific date range
        [HttpGet("matches-by-date-range")]
        public async Task<IActionResult> GetMatchesByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            if (startDate == default || endDate == default)
                return BadRequest("Invalid date range");

            try
            {
                var matches = await _repository.GetMatchesByDateRangeAsync(startDate, endDate);
                return Ok(matches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
