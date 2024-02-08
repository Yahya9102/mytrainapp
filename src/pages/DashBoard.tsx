import React, { useState, useEffect } from "react"
import { getTrainDetails } from "../service/userService"
import { TrainAnnouncement } from "../Types"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  const [data, setData] = useState<TrainAnnouncement[]>([])
  const [stationName, setStationName] = useState("")
  const [searchDate, setSearchDate] = useState("")

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const trainDetailsResponse = await getTrainDetails(
        stationName,
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
        <h1 className="mb-3">Försenade Tåg</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="mb-3">
            <label htmlFor="stationName" className="form-label">
              Station Namn:
            </label>
            <input
              type="text"
              id="stationName"
              className="form-control"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
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
          <button type="submit" className="btn btn-success">
            SÖK
          </button>
        </form>

        <ul className="list-group">
          {data.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Tågnummer: {item.trainNumber}</h5>
                <p className="mb-1">Tågbolag: {item.trainOwner}</p>
                <p className="mb-1">Station: {item.station}</p>
                <small>Original ankomsttid: {item.originalArrivalTime}</small>
              </div>
              <span className="badge bg-primary rounded-pill">
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
