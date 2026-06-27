import service from "./service.config"


export const uploadImage = (formData) => {
    return service.post("/upload", formData)
}