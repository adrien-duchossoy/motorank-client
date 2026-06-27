import service from "./service.config"

export const signup = (body) => {
    return service.post("/auth/signup", body)
}

export const login = (body) => {
    return service.post("/auth/login", body)
}

export const verifyLogin = () => {
    return service.get("/auth/verify")
}