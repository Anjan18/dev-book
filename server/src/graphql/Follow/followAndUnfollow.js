import Follow from 'models/Follow'
import { sendMessage } from 'utils/error'

const getQuery = async (id, projection) => {
    return await Follow.findOne({ user: id }, projection)
}

const following = 'following'
const followers = 'followers'

const sameId = (id1, id2) => {
    if (id1 === id2) {
        return true
    }
}

const saveDocuments = (documents) => {
    documents.forEach((document) => document.save())
}

const resolver = {
    Mutation: {
        followUser: async (
            _,
            { input: { userId } },
            { user: { id: ownerId } }
        ) => {
            if (sameId(userId, ownerId)) {
                return sendMessage(false, 'ownerId and other user id is same')
            }

            const ownerData = await getQuery(ownerId, following)
            const { following } = ownerData

            if (following.includes(userId)) {
                return sendMessage(false, 'You are already following the user')
            }
            console.log(ownerData)

            const otherUserData = await getQuery(userId, followers)

            const { followers } = otherUserData

            followers.push(ownerId)
            following.push(userId)

            saveDocuments([ownerData, otherUserData])

            return sendMessage(true, 'you are now following this user')
        },

        unfollowUser: async (
            _,
            { input: { userId } },
            { user: { id: ownerId } }
        ) => {
            if (sameId(userId, ownerId)) {
                return sendMessage(false, 'ownerId and other user id is same')
            }

            const ownerData = await getQuery(ownerId, following)
            const { following } = ownerData

            if (!following.includes(userId)) {
                return sendMessage(false, 'You are not following the user')
            }

            const otherUserData = await getQuery(userId, followers)

            const { followers } = otherUserData

            followers.remove(ownerId)
            following.remove(userId)

            saveDocuments([ownerData, otherUserData])

            return sendMessage(true, 'you have unfollowed this user')
        },
    },
}

export default resolver
