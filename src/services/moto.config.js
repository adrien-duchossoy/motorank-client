import service from "./service.config"

export const listAllMoto = () => {
    return service.get("/moto")
}

export const getMotoInfo = (slug) => {
    return service.get(`/moto/${slug}`)
}