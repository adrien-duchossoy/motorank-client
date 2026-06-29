import service from "./service.config"

export const getComments = (eventId) => {
    return service.get(`/event-comments/${eventId}`)
}

export const createComment = (eventId, body) => {
    return service.post(`/event-comments/${eventId}`, body)
}

export const updateComment = (commentId, body) => {
    return service.patch(`/event-comments/${commentId}`, body)
}

export const deleteComment = (commentId) => {
    return service.delete(`/event-comments/${commentId}`)
}
