import { ERROR_MESSAGE, MESSAGE } from 'variables/global'

const USER_ID = 'userID'
const POST_ID = 'postID'
const POST_OWNER_ID = 'postOwnerID'
const OWNER_ID = 'ownerID'
const OTHER_USER_ID = 'otherUserID'
const ANY_USER_ID = 'anyUserID'
const PROFILE_OWNER_ID = 'profileOwnerID'

const USER_ID_TYPE = `${USER_ID}: ID`
const POST_ID_TYPE = `${POST_ID}: ID`
const POST_OWNER_ID_TYPE = `${POST_OWNER_ID}: ID`
const OWNER_ID_TYPE = `${OWNER_ID}: ID`
const OTHER_USER_ID_TYPE = `${OTHER_USER_ID}: ID`
const ANY_USER_ID_TYPE = `${ANY_USER_ID}: ID`
const PROFILE_OWNER_ID_TYPE = `${PROFILE_OWNER_ID}: ID`
const MESSAGE_TYPE = `${MESSAGE}: String`
const ERROR_MESSAGE_TYPE = `${ERROR_MESSAGE}: String`
const ERROR_OR_MESSAGE_TYPE = `${ERROR_MESSAGE_TYPE} ${MESSAGE_TYPE}`
const IMAGE = `image: String`

export {
	POST_ID,
	POST_OWNER_ID,
	OWNER_ID,
	OTHER_USER_ID,
	ANY_USER_ID,
	PROFILE_OWNER_ID,
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
	OWNER_ID_TYPE,
	OTHER_USER_ID_TYPE,
	ANY_USER_ID_TYPE,
	PROFILE_OWNER_ID_TYPE,
	ERROR_OR_MESSAGE_TYPE,
	MESSAGE_TYPE,
	ERROR_MESSAGE_TYPE,
	USER_ID_TYPE,
	IMAGE,
}
