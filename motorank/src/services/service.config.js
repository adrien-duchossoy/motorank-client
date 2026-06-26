import axios from "axios";

// this is a file where we organize all requests to our backend server
const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")
  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }
  return config
})

export default service

//AUTH
export const signup = (body) => {
    return service.post("/auth/signup", body)
}

export const login = (body) => {
    return service.post("/auth/login", body)
}

export const verifyLogin = () => {
    return service.get("/auth/verify")
}

//USER

export const myProfile = () => {
    return service.get("/users/me")
}

export const updateGeneralProfile = (body) => {
    return service.patch("/users/me", body)
}

export const updateEmail = (body) => {
    return service.patch("/users/me/email", body)
}

export const updateHandle = (body)=> {
    return service.patch("/users/me/handle", body)
}

export const updatePassword = (body)=> {
    return service.patch("/users/me/password", body)
}

export const updateProfilePicture = (body)=> {
    return service.patch("/users/me/picture", body)
}

//FOLLOW

export const followUser = (targetId)=> {
    return service.post(`/users/me/following/${targetId}`)
}



//* examples of doing services as functions instead of passing service
// function createRecipe(body) {
//   return service.post("/recipes", body)
// }

// function examplePrivateRoute() {
//   return service.get("/example-of-private-route")
// }

// function signup(body) {
//   return service.get("/signup", body)
// }

// export default { createRecipe, examplePrivateRoute, signup }