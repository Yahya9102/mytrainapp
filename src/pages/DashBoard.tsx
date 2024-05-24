import React, { useState } from "react";
import { getTrainDetails } from "../service/userService";
import { TrainAnnouncement } from "../Types";
import Navbar from "../components/Navbar";

const stations = [
  "Eskilstuna",
  "Stockholm",
  "Uppsala",
  "Örebro",
  "Arboga",
  "Kungsör",
  "Strängnäs",
  "Läggesta",
  "Nykvarn",
  "Södertälje",
  "Flemingsberg",
  "Arlanda",
  "Märsta",
  "Knivsta",
  "Sala",
  "Ransta",
  "Västerås",
  "Kolbäck",
  "Kvicksund",
  "Hälleforsnäs",
  "Flen",
  "Katrineholm",
  "Norrköping",
  "Linköping",
];

const Dashboard = () => {
  const [data, setData] = useState<TrainAnnouncement[]>([]);
  const [stationName, setStationName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [trainNumber] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStationNameChange = (value: string) => {
    if (!value) {
      setStationName("");
      setSuggestions([]);
      return;
    }

    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setStationName(formattedValue);

    const filteredSuggestions = stations.filter((station) =>
      station.toLowerCase().startsWith(formattedValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setStationName(suggestion);
    setSuggestions([]);
  };

  const handleStationListClick = (station: string) => {
    setStationName(station);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const trainDetailsResponse = await getTrainDetails(
        stationName,
        trainNumber,
        searchDate
      );
      setData(trainDetailsResponse);
    } catch (error) {
      console.error("Error fetching train details:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-3 text-center text-secondary">
          Sök efter försenade tåg i mälardalen
        </h1>
        <p className="mb-3 text-center text-secondary"></p>
        <form onSubmit={handleSearch} className="mb-4 border p-4 shadow">
          <div className="mb-3 d-flex align-items-center position-relative">
            <div className="flex-grow-1">
              <label htmlFor="stationName" className="form-label">
                Station Namn:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="stationName"
                  className="form-control"
                  value={stationName.trim()}
                  onChange={(e) => handleStationNameChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleDropdown}
                >
                  ▼
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {showDropdown && (
            <ul className="list-group mb-3">
              {stations.map((station, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleStationListClick(station)}
                  style={{ cursor: "pointer" }}
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
          <div className="mb-3">
            <label htmlFor="searchDate" className="form-label">
              Datum:
            </label>
            <input
              type="date"
              id="searchDate"
              className="form-control"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            SÖK
          </button>
        </form>

        <ul className="list-group">
          {data.map((item, index) => (
            <li
              key={item.id ? item.id : `item-${index}`}
              className="list-group-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2 bg-white rounded"
            >
              <div>
                <h5 className="mb-1">Tågnummer: {item.trainNumber}</h5>
                <p className="mb-1">Tågbolag: {item.trainOwner}</p>
                <p className="mb-1">Ankomststation: {item.station}</p>
                <small>Original ankomsttid: {item.originalArrivalTime}</small>
                {item.trainOwner === "MÄLAB" && (
                  <a
                    href="https://evf-regionsormland.preciocloudapp.net/trains"
                    className="d-block mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sök ersättning
                  </a>
                )}
              </div>
              <span className="badge bg-warning rounded-pill">
                {item.delayMinutes} min försening
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
