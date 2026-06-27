import service from "./service.config"

export const myFeed = () => {
    return service.get("/events/feed")
}

export const myActivity = () => {
    return service.get("/events/me")
}