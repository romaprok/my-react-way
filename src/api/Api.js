import * as axios from "axios";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9a75d041-72ac-4332-ad7a-749ea855f8b0'
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        debugger
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                debugger
                return response.data
            })
    },
    follow(userId) {
        return instanse.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instanse.delete(`follow/${userId}`)
    },
    getProfile(userId) {
      console.log('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId)

    }
}
export const profileAPI = {
    getProfile(userId) {
        return instanse.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instanse.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instanse.get(`profile/status`, {status: status})
    }
}
export const authAPI = {
    me() {
        return instanse.get(`auth/me`)
    }
}