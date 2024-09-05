import React, { useState } from "react";
import { getTopPlayersWithHighestFanEngagement } from "../services/apiservices";

const TopPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [numPlayers, setNumPlayers] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTopPlayers = async () => {
    if (numPlayers <= 0) {
      setError("Number of players must be greater than 0.");
      return;
    }
    setLoading(true);
    try {
      const data = await getTopPlayersWithHighestFanEngagement(numPlayers);
      setPlayers(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch top players.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNumPlayers(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Top Players with Highest Fan Engagement
      </h2>
      <div className="mb-6">
        <label htmlFor="numPlayers" className="block text-gray-700 mb-2">
          Number of Top Players:
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            id="numPlayers"
            value={numPlayers}
            min="1"
            onChange={handleChange}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-md flex-1"
          />
          <button
            onClick={fetchTopPlayers}
            disabled={loading}
            className={`px-4 py-2 font-bold text-white rounded-md ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Fetch Players"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Player Name</th>
              <th className="py-3 px-6 text-left">Team ID</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Matches Played</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {players.length > 0 ? (
              players.map((player, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{player.playerName}</td>
                  <td className="py-3 px-6">{player.teamId}</td>
                  <td className="py-3 px-6">{player.role}</td>
                  <td className="py-3 px-6">{player.age}</td>
                  <td className="py-3 px-6">{player.matchesPlayed}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No players available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPlayers;
