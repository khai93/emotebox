const discordHelper = {}

discordHelper.getAvatar = (userId, userAvatarHash) => `https://cdn.discordapp.com/avatars/${userId}/${userAvatarHash}`

export {discordHelper as default}