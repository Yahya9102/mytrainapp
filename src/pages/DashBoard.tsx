import React, { useState } from "react";
import { getTrainDetails } from "../service/userService";
import { TrainAnnouncement } from "../Types";
import Navbar from "../components/Navbar";

const stationNames: { [key: string]: string } = {
  "ET": "Eskilstuna",
  "CST": "Stockholm",
  "U": "Uppsala",
  "ÖR": "Örebro",
  "ARB": "Arboga",
  "KÖR": "Kungsör",
  "SGS": "Strängnäs",
  "LG": "Läggesta",
  "NKV": "Nykvarn",
  "SÖÖ": "Södertälje",
  "FLB": "Flemingsberg",
  "ARNC": "Arlanda",
  "MR": "Märsta",
  "KN": "Knivsta",
  "SL": "Sala",
  "RN": "Ransta",
  "VÅ": "Västerås",
  "KBÄ": "Kolbäck",
  "KSU": "Kvicksund",
  "HNÄ": "Hälleforsnäs",
  "FLE": "Flen",
  "K": "Katrineholm",
  "NR": "Norrköping",
  "LP": "Linköping",
  "ÖB": "Örebro södra",
  "VR": "Vingåker",
  "HPBG": "Hallsberg",
};

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
  const [ankomststation, setAnkomststation] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStationNameChange = (value: string) => {
    if (!value) {
      setAnkomststation("");
      setSuggestions([]);
      return;
    }

    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setAnkomststation(formattedValue);

    const filteredSuggestions = stations.filter((station) =>
      station.toLowerCase().startsWith(formattedValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAnkomststation(suggestion);
    setSuggestions([]);
  };

  const handleStationListClick = (station: string) => {
    setAnkomststation(station);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const trainDetailsResponse = await getTrainDetails(
        ankomststation,
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

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleTimeString("sv-SE", options);
  };

  const calculateDelay = (plannedTime: string, estimatedTime: string) => {
    const plannedDate = new Date(plannedTime);
    const estimatedDate = new Date(estimatedTime);
    const differenceInMinutes = Math.round(
      (estimatedDate.getTime() - plannedDate.getTime()) / 60000
    );
    return differenceInMinutes > 0 ? differenceInMinutes : 0;
  };

  const determineCompensation = (delay: number) => {
    if (delay >= 60) return "100% av biljettpriset";
    if (delay >= 40) return "75% av biljettpriset";
    if (delay >= 20) return "50% av biljettpriset";
    return "Ingen ersättning";
  };

  const getStationName = (code: string) => {
    return stationNames[code.toUpperCase()] || code;
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-3 text-center text-secondary">
          Sök efter försenade tåg i Mälardalen
        </h1>
        <form onSubmit={handleSearch} className="mb-4 border p-4 shadow">
          <div className="mb-3 d-flex align-items-center position-relative">
            <div className="flex-grow-1">
              <label htmlFor="ankomststation" className="form-label">
                Ankomststation:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="ankomststation"
                  className="form-control"
                  value={ankomststation.trim()}
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

        {data.length === 0 ? (
          <p className="text-center">Inga försenade tåg.</p>
        ) : (
          <ul className="list-group">
            {data
              .filter((item) => {
                if (item.TrainOwner !== "MÄLAB") return false;

                const delay = calculateDelay(
                  item.AdvertisedTimeAtLocation,
                  item.EstimatedTimeAtLocation
                );

                return delay >= 20;
              })
              .sort((a, b) => {
                const delayA = calculateDelay(
                  a.AdvertisedTimeAtLocation,
                  a.EstimatedTimeAtLocation
                );
                const delayB = calculateDelay(
                  b.AdvertisedTimeAtLocation,
                  b.EstimatedTimeAtLocation
                );

                const compensationA = determineCompensation(delayA);
                const compensationB = determineCompensation(delayB);

                if (
                  compensationA === "Ingen ersättning" &&
                  compensationB !== "Ingen ersättning"
                ) {
                  return 1; // Placera de utan ersättning längst ner
                } else if (
                  compensationA !== "Ingen ersättning" &&
                  compensationB === "Ingen ersättning"
                ) {
                  return -1; // Placera de med ersättning överst
                }
                return 0; // Behåll ordningen om båda är lika
              })
              .map((item, index) => {
                const delay = calculateDelay(
                  item.AdvertisedTimeAtLocation,
                  item.EstimatedTimeAtLocation
                );

                const compensation = determineCompensation(delay);

                return (
                  <li
                    key={item.ActivityId ? item.ActivityId : `item-${index}`}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2 bg-white rounded"
                  >
                    <div>
                      <h5 className="mb-1">
                        Tågnummer: {item.AdvertisedTrainIdent}
                      </h5>
                      <p className="mb-1">Tågbolag: {item.TrainOwner}</p>
                      {item.FromLocation?.some(
                        (loc) => loc.LocationName !== item.LocationSignature
                      ) && (
                        <p className="mb-1">
                          Från:{" "}
                          {item.FromLocation?.map((loc) =>
                            getStationName(loc.LocationName)
                          ).join(", ")}
                        </p>
                      )}
                      <p className="mb-1">
                        Till: {getStationName(item.LocationSignature)}
                      </p>
                      <p className="mb-1">
                        Planerad ankomsttid: {formatTime(item.AdvertisedTimeAtLocation)}
                      </p>
                      <p className="mb-1">
                      Faktisk ankomsttid: {formatTime(item.EstimatedTimeAtLocation)}
                      </p>
                      <p
                        className={`mb-1 ${delay >= 20 ? "text-danger" : ""} font-weight-bold`}
                      >
                        Försening: {delay} minuter
                      </p>

                      <p className="mb-1 font-weight-bold text-primary">
                        Ersättning: {compensation}
                      </p>
                      <p className="mb-1">
                        <a
                          href="https://evf-regionsormland.preciocloudapp.net/trains"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-lg"
                        >
                          Sök ersättning
                        </a>
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dashboard;
