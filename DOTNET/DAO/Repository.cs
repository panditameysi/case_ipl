using IPL_API.Models;
using IPL_API.DAO;
using Npgsql;

namespace IPL_API.DAO
{
    public class Repository : IRepository
    {
        private readonly string _connectionString;

        public Repository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PostgresDB");
        }

        // Add a new player
        public async Task<int> AddPlayerAsync(Player player)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                    INSERT INTO ipl.Players (player_name, team_id, role, age, matches_played)
                    VALUES (@PlayerName, @TeamId, @Role, @Age, @MatchesPlayed)
                    RETURNING player_id";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@PlayerName", player.PlayerName);
                    command.Parameters.AddWithValue("@TeamId", player.TeamId);
                    command.Parameters.AddWithValue("@Role", player.Role);
                    command.Parameters.AddWithValue("@Age", player.Age);
                    command.Parameters.AddWithValue("@MatchesPlayed", player.MatchesPlayed);

                    return (int)await command.ExecuteScalarAsync();
                }
            }
        }

        // Retrieve detailed statistics for each match, including fan engagements
        public async Task<IEnumerable<dynamic>> GetMatchDetailsWithFanEngagementAsync()
        {
            var results = new List<dynamic>();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                    SELECT m.match_date, m.venue, t1.team_name AS Team1, t2.team_name AS Team2,
                    COUNT(fe.engagement_id) AS TotalEngagements
                    FROM ipl.Matches m
                    JOIN ipl.Teams t1 ON m.team1_id = t1.team_id
                    JOIN ipl.Teams t2 ON m.team2_id = t2.team_id
                    LEFT JOIN ipl.Fan_Engagement fe ON fe.match_id = m.match_id
                    GROUP BY m.match_date, m.venue, t1.team_name, t2.team_name";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            results.Add(new
                            {
                                MatchDate = reader.GetDateTime(0),
                                Venue = reader.GetString(1),
                                Team1 = reader.GetString(2),
                                Team2 = reader.GetString(3),
                                TotalEngagements = reader.GetInt32(4)
                            });
                        }
                    }
                }
            }

            return results;
        }

        // Retrieve top 5 players based on the number of matches played and highest fan engagements
        public async Task<IEnumerable<Player>> GetTopPlayersWithHighestFanEngagementAsync(int topPlayersCount)
        {
            var players = new List<Player>();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                    SELECT p.player_id, p.player_name, p.team_id, p.role, p.age, p.matches_played
                    FROM ipl.Players p
                    JOIN ipl.Matches m ON (p.team_id = m.team1_id OR p.team_id = m.team2_id)
                    JOIN ipl.Fan_Engagement fe ON fe.match_id = m.match_id
                    GROUP BY p.player_id, p.player_name, p.team_id, p.role, p.age, p.matches_played
                    ORDER BY COUNT(fe.engagement_id) DESC, p.matches_played DESC
                    LIMIT @TopPlayersCount";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TopPlayersCount", topPlayersCount);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            players.Add(new Player
                            {
                                PlayerId = reader.GetInt32(0),
                                PlayerName = reader.GetString(1),
                                TeamId = reader.GetInt32(2),
                                Role = reader.GetString(3),
                                Age = reader.GetInt32(4),
                                MatchesPlayed = reader.GetInt32(5)
                            });
                        }
                    }
                }
            }

            return players;
        }

        // Retrieve matches played within a specific date range
        public async Task<IEnumerable<Match>> GetMatchesByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var matches = new List<Match>();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                    SELECT m.match_id, m.match_date, m.venue, m.team1_id, m.team2_id, m.winner_team_id
                    FROM ipl.Matches m
                    WHERE m.match_date BETWEEN @StartDate AND @EndDate";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@StartDate", startDate);
                    command.Parameters.AddWithValue("@EndDate", endDate);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            matches.Add(new Match
                            {
                                MatchId = reader.GetInt32(0),
                                MatchDate = reader.GetDateTime(1),
                                Venue = reader.GetString(2),
                                Team1Id = reader.GetInt32(3),
                                Team2Id = reader.GetInt32(4),
                                WinnerTeamId = reader.IsDBNull(5) ? (int?)null : reader.GetInt32(5)
                            });
                        }
                    }
                }
            }

            return matches;
        }
    }
 }
