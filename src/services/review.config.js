import service from "./service.config"

export const getReviewById = (reviewId) => {
    return service.get(`/reviews/${reviewId}`)
}

export const myReviews = () => {
    return service.get("/reviews/me")
}

export const allModelReviews = (motoId) => {
    return service.get(`/reviews/moto/${motoId}`)
}

export const createReview = (body) => {
    return service.post("/reviews", body)
}

export const updateMyReview = (reviewId, body) => {
    return service.patch(`/reviews/${reviewId}`, body)
}

export const deleteMyReview = (reviewId) => {
    return service.delete(`/reviews/${reviewId}`)
}