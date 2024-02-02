import axios from "axios"

const baseURL = "http://localhost:8080/"

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

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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
    console.log("1")
    await axios.get("logout")
    console.log("2")
    localStorage.removeItem("token")
    console.log("3")
    window.location.href = "/"
    console.log("4")
  } catch (error) {
    console.log("1E")
    throw error
  }
}
