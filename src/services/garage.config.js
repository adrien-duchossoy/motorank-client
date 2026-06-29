import service from "./service.config"

export const myGarage = () => {
    return service.get("/garage")
}

export const getGarageEntry = (garageEntryId) => {
    return service.get(`/garage/${garageEntryId}`)
}

export const addToMyGarage = (body) => {
    return service.post("/garage", body)
}

export const addPictureToGarage = (garageEntryId, body) => {
    return service.post(`/garage/${garageEntryId}/photos`, body)
}

export const deletePictureFromGarage = (garageEntryId, body) => {
    return service.delete(`/garage/${garageEntryId}/photos`, { data: body })
}

export const deleteFromMyGarage = (garageEntryId) => {
    return service.delete(`/garage/${garageEntryId}`)
}