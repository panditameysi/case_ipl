using IPL_API.Models;
using IPL_API.DAO;
namespace IPL_API.DAO
{
    public interface IRepository
    {
        Task<int> AddPlayerAsync(Player player);

        // Match-specific operations
        Task<IEnumerable<dynamic>> GetMatchDetailsWithFanEngagementAsync();
        Task<IEnumerable<Player>> GetTopPlayersWithHighestFanEngagementAsync(int topPlayersCount);
        Task<IEnumerable<Match>> GetMatchesByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
