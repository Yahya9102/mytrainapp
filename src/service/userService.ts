import axios from "axios"

export async function getUsers() {
  try {
    const response = await axios.get("baseURLusers")

    return response.data
  } catch (error) {
    throw error
  }
}

export async function loginUser(credentials: {
  username: string
  password: string
}) {
  try {
    const response = await axios.post("baseURLlogin", credentials)
    localStorage.setItem("token", response.data)

    return response.data
  } catch (error) {
    throw error
  }
}

const baseURL = process.env.REACT_APP_BASE_URL
const apiKey = process.env.REACT_APP_TRAIN_INFO_API_KEY
const headerName = process.env.REACT_APP_TRAIN_INFO_HEADER as string

export async function getTrainDetails(
  stationName: string,
  trainNumber: string,
  searchDate: string
) {
  try {
    const url = new URL(baseURL + "stations")

    if (stationName) url.searchParams.append("stationName", stationName)
    if (trainNumber) url.searchParams.append("trainNumber", trainNumber)
    if (searchDate) url.searchParams.append("searchDate", searchDate)

    const headers = {
      [headerName]: apiKey,
    }

    const response = await axios.get(url.toString(), { headers })

    return response.data
  } catch (error) {
    throw error
  }
}
