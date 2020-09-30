
const AuthHelper = {}

AuthHelper.getAuthenticatedUser = () => {
    return fetch("/api/auth/user")
        .then(res => {
            if (res.status === 401) {
                return window.location = "/login";
            }

            return res.json()
        })
        .then((userRes) => {
            return userRes;
        },
        (error) => {
            throw new Error(error)
        })
} 

export { AuthHelper as default }