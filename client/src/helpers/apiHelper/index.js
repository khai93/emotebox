
const ApiHelper = {}

ApiHelper.searchEmotesByText = (limit, startAt, input) => {
    return fetch(`/api/emotes/search?limit=${limit}&startAt=${startAt}&searchTerm=${input}`)
        .then(res => {
            return res.json()
        })
        .then((json) => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
} 

ApiHelper.searchPacksByText = (limit, startAt, input) => {
    return fetch(`/api/packs/search?limit=${limit}&startAt=${startAt}&searchTerm=${input}`)
        .then(res => {
            return res.json();
        })
        .then((json) => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
} 

ApiHelper.getImageFromKey = (imageKey) => process.env.PUBLIC_URL + "/api/emotes/images/" + imageKey;

ApiHelper.getEmotesByCreator = (id) => {
    return fetch(`/api/emotes/creator/${id}`)
        .then(res => {
            return res.json();
        })
        .then((json) => {
            return json
        },
        (error) => {
            throw new Error(error)
        })
}
export { ApiHelper as default }