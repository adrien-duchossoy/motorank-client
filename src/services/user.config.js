import service from './service.config'

//ACCOUNT ACTIONS

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

export const deleteAccount = () => {
    return service.delete("/users/me")
}

//FOLLOW

export const followUser = (targetId)=> {
    return service.post(`/users/me/following/${targetId}`)
}

export const unfollowUser = (targetId)=> {
    return service.delete(`/users/me/following/${targetId}`)
}

export const getFollowers = () => {
    return service.get("/users/me/followers")
}

export const getFollowing = () => {
    return service.get("/users/me/following")
}

//FAVORITES

export const addToFavorite = (motoId) => {
    return service.post(`/users/me/favorites/${motoId}`)
}

export const removeFavorite = (motoId) => {
    return service.delete(`/users/me/favorites/${motoId}`)
}

export const listFavorites = () => {
    return service.get("/users/me/favorites")
}


//PUBLIC USER

export const getPublicProfile = (accountId) => {
    return service.get(`/users/${accountId}`)
}

export const listFollowersPublic = (accountId) => {
    return service.get(`/users/${accountId}/followers`)
}

export const listFollowingPublic = (accountId) => {
    return service.get(`/users/${accountId}/following`)
}

export const getPublicGarage = (accountId) => {
    return service.get(`/users/${accountId}/garage`)
}

export const listPublicReviews = (accountId) => {
    return service.get(`/users/${accountId}/reviews`)
}