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

ApiHelper.editEmoteById = (emote_id, name, tags) => {
    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            emote_id,
            ...(name && {name}),
            ...(tags && {tags})
        })
    }

    return fetch ('/api/emotes/edit', requestOpts)
        .then(response => response.json())
        .then(json => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
}

ApiHelper.uploadEmote = (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('emoteName', image.name);

    const opts = {
        method: 'POST',
        body: formData
    };

    return fetch('/api/emotes/create', opts)
        .then(resp => resp.json())
        .then(json => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
}

ApiHelper.addEmoteTag = (emote_id, tag) => {
    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            emote_id,
            tag
        })
    }

    return fetch ('/api/emotes/edit/tag/add', requestOpts)
        .then(response => response.json())
        .then(json => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
}

ApiHelper.removeEmoteTag = (emote_id, tag) => {
    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            emote_id,
            tag
        })
    }

    return fetch ('/api/emotes/edit/tag/remove', requestOpts)
        .then(response => response.json())
        .then(json => {
            return json;
        },
        (error) => {
            throw new Error(error)
        })
}

ApiHelper.deleteEmoteById = (emote_id) => {
    const requestOpts = {
        method: 'POST'
    }

    return fetch(`/api/emotes/delete/${emote_id}`, requestOpts)
        .then(response => response.json())
        .then(json => {
            return json;
        }, (error) => {
            throw new Error(error)
        })
}




export { ApiHelper as default }