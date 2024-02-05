import React, { useEffect, useState } from "react"
import { getTrainDetails } from "../service/userService"
import { TrainAnnouncement } from "../Types"

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TrainAnnouncement[]>([])

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const trainDetailsResponse = await getTrainDetails()
        setData(trainDetailsResponse)
      } catch (error) {
        console.error("Error fetching train details:", error)
      }
    }
    fetchTrainDetails()
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Tågankomster</h1>
      <ul className="list-group">
        {data.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">Tågnummer: {item.trainNumber}</h5>
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
  )
}

export default Dashboard
