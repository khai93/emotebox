
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

ApiHelper.getImageFromKey = (imageKey) => window.location.protocol + "//" + window.location.hostname + ":5000/api/emotes/images/" + imageKey;

export { ApiHelper as default }