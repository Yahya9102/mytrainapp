import axios from "axios"

const baseURL = "http://localhost:8080/users"

export async function getUsers() {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    throw error
  }
}
