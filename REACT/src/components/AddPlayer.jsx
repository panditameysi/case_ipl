import React, { useState } from "react";
import { addPlayer } from "../services/apiservices";

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    playerName: "",
    teamId: "",
    role: "",
    age: "",
    matchesPlayed: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlayer(player);
      setSuccess("Player added successfully!");
      setError("");
    } catch (err) {
      setError("Failed to add player. Please check your input.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Player</h2>
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Player Name:</label>
          <input
            type="text"
            name="playerName"
            value={player.playerName}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Team ID:</label>
          <input
            type="number"
            name="teamId"
            value={player.teamId}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            name="role"
            value={player.role}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={player.age}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Matches Played:</label>
          <input
            type="number"
            name="matchesPlayed"
            value={player.matchesPlayed}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          Add Player
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
