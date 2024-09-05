SET search_path to ipl;
SHOW search_path;

CREATE TABLE ipl.Teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(50) UNIQUE NOT NULL,
    coach VARCHAR(50) NOT NULL,
    home_ground VARCHAR(100) NOT NULL,
    founded_year INTEGER NOT NULL,
    owner VARCHAR(50) NOT NULL
);

CREATE TABLE ipl.Players (
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    team_id INTEGER NOT NULL REFERENCES ipl.Teams(team_id),
    role VARCHAR(30) NOT NULL,
    age INTEGER NOT NULL,
    matches_played INTEGER NOT NULL
);

CREATE TABLE ipl.Matches (
    match_id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,
    venue VARCHAR(100) NOT NULL,
    team1_id INTEGER NOT NULL REFERENCES ipl.Teams(team_id),
    team2_id INTEGER NOT NULL REFERENCES ipl.Teams(team_id),
    winner_team_id INTEGER REFERENCES ipl.Teams(team_id)
);

CREATE TABLE ipl.Fan_Engagement (
    engagement_id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES ipl.Matches(match_id),
    fan_id INTEGER NOT NULL,
    engagement_type VARCHAR(50) NOT NULL, 
    engagement_time TIMESTAMP NOT NULL
);

SELECT * FROM ipl.Teams;
SELECT * FROM ipl.Players;
SELECT * FROM ipl.Matches;
SELECT * FROM ipl.Fan_Engagement;