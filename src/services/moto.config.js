import service from "./service.config"

export const listAllMoto = (params = {}) => {
    return service.get("/motos", { params })
}

export const getMotoInfo = (slug) => {
    return service.get(`/motos/${slug}`)
}
