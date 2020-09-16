
const ApiHelper = {}

ApiHelper.searchEmotesByText = (startAt, input) => {
    return fetch(`/api/emotes/search?limit=25&startAt=${startAt}&searchTerm=${input}`)
        .then(res => {
            return res.json()
        })
        .then((userRes) => {
            return userRes;
        },
        (error) => {
            throw new Error(error)
        })
} 

export { ApiHelper as default }