import React from 'react'
import { GetServerSideProps } from 'next'
import getToken from 'utils/getToken'
import decodeToken from 'utils/decodeToken'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import createRedirectObject from 'utils/createRedirectObject'
import Requset from 'interfaces/requsetResponse'
import { LOGIN_URL } from 'variables/global'
import { PropsWithUserData } from 'interfaces/user'
import PageWrapper from 'components/PageWrapper/PageWrapper'

interface Props extends PropsWithUserData {}

const Profile = ({ userData }: Props) => {
	return (
		<PageWrapper userData={userData}>
			<div>this is a profile page</div>
		</PageWrapper>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const userData = decodeToken(req as Requset)

	return { props: { userData } }
}

export default Profile