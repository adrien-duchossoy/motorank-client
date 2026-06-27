import service from "./service.config"

export const createMoto = (body) => {
    return service.post("/admin/motos", body)
}

export const updateMoto = (motoId, body) => {
    return service.patch(`/admin/motos/${motoId}`, body)
}

export const deleteMoto = (motoId) => {
    return service.delete(`/admin/motos/${motoId}`)
}