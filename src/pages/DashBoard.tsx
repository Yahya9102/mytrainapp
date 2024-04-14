import React, { useState } from "react"
import { getTrainDetails } from "../service/userService"
import { TrainAnnouncement } from "../Types"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  const [data, setData] = useState<TrainAnnouncement[]>([])
  const [stationName, setStationName] = useState("")
  const [searchDate, setSearchDate] = useState("")
  const [trainNumber] = useState("")

  const handleStationNameChange = (value: string) => {
    if (!value) {
      setStationName("")
      return
    }

    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1)
    setStationName(formattedValue)
  }

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const trainDetailsResponse = await getTrainDetails(
        stationName,
        trainNumber,
        searchDate
      )
      setData(trainDetailsResponse)
    } catch (error) {
      console.error("Error fetching train details:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-3 text-center text-secondary">Försenade Tåg</h1>
        <form onSubmit={handleSearch} className="mb-4 border p-4 shadow">
          <div className="mb-3">
            <label htmlFor="stationName" className="form-label">
              Station Namn:
            </label>
            <input
              type="text"
              id="stationName"
              className="form-control"
              value={stationName}
              onChange={(e) => handleStationNameChange(e.target.value)}
              required
            />
          </div>

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
                <p className="mb-1">Station: {item.station}</p>
                <small>Original ankomsttid: {item.originalArrivalTime}</small>
                {item.trainOwner === "MÄLAB" && (
                  <a
                    href="https://malartag.se/kundservice/ersattning-vid-forsening/"
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
  )
}

export default Dashboard

/*     <div className="mb-3">
            <label htmlFor="trainNumber" className="form-label">
              Tågnummer:
            </label>
            <input
              type="text"
              id="trainNumber"
              className="form-control"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
  */
