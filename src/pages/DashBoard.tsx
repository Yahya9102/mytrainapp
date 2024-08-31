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
  const [ankomststation, setAnkomststation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [avgangStation, setAvgangStation] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [avgangStationSuggestions, setavgangStationSuggestions] = useState<string[]>([]);
  const [showavgangStationDropdown, setShowavgangStationDropdown] = useState(false);

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

  const handleavgangStationChange = (value: string) => {
    if (!value) {
      setAvgangStation("");
      setavgangStationSuggestions([]);
      return;
    }

    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setAvgangStation(formattedValue);

    const filteredSuggestions = stations.filter((station) =>
      station.toLowerCase().startsWith(formattedValue.toLowerCase())
    );
    setavgangStationSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAnkomststation(suggestion);
    setSuggestions([]);
  };

  const handleavgangStationSuggestionClick = (suggestion: string) => {
    setAvgangStation(suggestion);
    setavgangStationSuggestions([]);
  };

  const handleStationListClick = (station: string) => {
    setAnkomststation(station);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleavgangStationListClick = (station: string) => {
    setAvgangStation(station);
    setavgangStationSuggestions([]);
    setShowavgangStationDropdown(false);
  };

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const trainDetailsResponse = await getTrainDetails(
        ankomststation,
        searchDate,
        avgangStation
      );
      setData(trainDetailsResponse);
    } catch (error) {
      console.error("Error fetching train details:", error);
    }
  };
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleavgangStationDropdown = () => {
    setShowavgangStationDropdown(!showavgangStationDropdown);
  };



  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleTimeString('sv-SE', options);
  };

  const calculateDelay = (plannedTime: string, estimatedTime: string) => {
    const plannedDate = new Date(plannedTime);
    const estimatedDate = new Date(estimatedTime);
    const differenceInMinutes = Math.round((estimatedDate.getTime() - plannedDate.getTime()) / 60000);
    return differenceInMinutes > 0 ? differenceInMinutes : 0;
  };


  const formatTimeToLocal = (utcDateString: string | number | Date) => {
    const date = new Date(utcDateString);
    return date.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm'
    });
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
          <div className="mb-3 d-flex align-items-center position-relative">
            <div className="flex-grow-1">
              <label htmlFor="avgangStation" className="form-label">
                Avgångstation:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="avgangStation"
                  className="form-control"
                  value={avgangStation.trim()}
                  onChange={(e) => handleavgangStationChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleavgangStationDropdown}
                >
                  ▼
                </button>
              </div>
              {avgangStationSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100">
                  {avgangStationSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleavgangStationSuggestionClick(suggestion)}
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
          {showavgangStationDropdown && (
            <ul className="list-group mb-3">
              {stations.map((station, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleavgangStationListClick(station)}
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
              key={item.ActivityId ? item.ActivityId : `item-${index}`}
              className="list-group-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-2 bg-white rounded"
            >
              <div>
                <h5 className="mb-1">Tågnummer: {item.AdvertisedTrainIdent}</h5>
                <p className="mb-1">Tågbolag: {item.TrainOwner}</p>
                <p className="mb-1">Från: {item.FromLocation?.map(loc => loc.LocationName).join(', ')}</p>
                <p className="mb-1">Till: {item.LocationSignature}</p>
                <p className="mb-1">
                  Planerad tid: {formatTime(item.AdvertisedTimeAtLocation)}
                </p>
                <p className="mb-1">
                  Beräknad tid: {formatTime(item.EstimatedTimeAtLocation)}
                </p>
                <p className="mb-1">
                  Försening: {calculateDelay(item.AdvertisedTimeAtLocation, item.EstimatedTimeAtLocation)} minuter
                </p>
                <p className="mb-1">Spår: {item.TrackAtLocation}</p>
                <p className="mb-1">
                  {item.WebLinkName}: <a href={item.WebLink} target="_blank" rel="noopener noreferrer">{item.WebLink}</a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
