import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // ví dụ: "https://localhost:7167/api"
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (token && originalRequest.headers)
              originalRequest.headers["Authorization"] = "Bearer " + token
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) throw new Error("Không có refreshToken")

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        )

        const newAccessToken = res.data.accessToken
        const newRefreshToken = res.data.refreshToken

        localStorage.setItem("accessToken", newAccessToken)
        localStorage.setItem("refreshToken", newRefreshToken)

        processQueue(null, newAccessToken)

        if (originalRequest.headers)
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("role")
        // window.location.href = "/login"
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
