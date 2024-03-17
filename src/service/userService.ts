import axios from "axios"

export async function getUsers() {
  try {
    const response = await axios.get(baseURL + "users")

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
    const response = await axios.post(baseURL + "login", credentials)
    localStorage.setItem("token", response.data)

    return response.data
  } catch (error) {
    throw error
  }
}
/*


import jwt_decode, { jwtDecode } from "jwt-decode"




axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")

  if (token) {
    // This ensures token is not null
    // Assuming jwtDecode is correctly imported as suggested fixes above
    const decodedToken: any = jwtDecode(token) // Use the correct import method for jwtDecode
    const currentTime = Date.now() / 1000

    if (decodedToken.exp < currentTime) {
      try {
        const response = await axios.post(baseURL + "renewToken")
        const newToken = response.data
        localStorage.setItem("token", newToken)
        config.headers.Authorization = `Bearer ${newToken}`
      } catch (error) {
        console.error("Token renewal error: ", error)
        // Additional error handling as needed
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

export async function getUserDetails() {
  try {
    const response = await axios.get(baseURL + "userdetails", {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function logoutUser() {
  try {
    await axios.get(baseURL + "logout")

    localStorage.removeItem("token")
  } catch (error) {
    throw error
  }
}

*/

const baseURL = "www.traninfo-env.eba-xhrduvud.eu-north-1.elasticbeanstalk.com"

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

    const response = await axios.get(url.toString(), {
      headers: {
        [process.env.REACT_APP_TRAIN_INFO_HEADER as string]: process.env
          .REACT_APP_TRAIN_INFO_API_KEY as string,
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    throw error
  }
}
