SET search_path to ipl;
--1. Create a view named TopPerformers that shows the names of players, their teams, and the number of matches they have played, filtering only those who have played more than 100 matches.
CREATE VIEW TopPerformers AS
SELECT p.player_name, t.team_name, p.matches_played
FROM ipl.Players p
JOIN ipl.Teams t ON p.team_id = t.team_id
WHERE p.matches_played > 100;
SELECT * FROM TopPerformers;

--2. Create a view named MatchHighlights that displays the match date, teams involved, venue, and the winner of each match.
CREATE VIEW MatchHighlights AS
SELECT m.match_date, t1.team_name AS team1, t2.team_name AS team2, m.venue, wt.team_name AS winner
FROM ipl.Matches m
JOIN ipl.Teams t1 ON m.team1_id = t1.team_id
JOIN ipl.Teams t2 ON m.team2_id = t2.team_id
JOIN ipl.Teams wt ON m.winner_team_id = wt.team_id;
SELECT * FROM MatchHighlights;

--3. Create a view named FanEngagementStats that summarizes the total engagements for each match, including match date and venue.
CREATE VIEW FanEngagementStats AS
SELECT m.match_date, m.venue, COUNT(fe.engagement_id) AS total_engagements
FROM ipl.Matches m
JOIN ipl.Fan_Engagement fe ON m.match_id = fe.match_id
GROUP BY m.match_date, m.venue;
SELECT * FROM FanEngagementStats;

--4. Create a view named TeamPerformance that shows each team's name, the number of matches played, and the number of matches won.
CREATE VIEW TeamPerformance AS
SELECT t.team_name, COUNT(m.match_id) AS matches_played, SUM(CASE WHEN m.winner_team_id = t.team_id THEN 1 ELSE 0 END) AS matches_won
FROM ipl.Teams t
JOIN ipl.Matches m ON t.team_id = m.team1_id OR t.team_id = m.team2_id
GROUP BY t.team_name;
SELECT * FROM TeamPerformance;