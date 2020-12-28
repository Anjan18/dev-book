import React, { Suspense, lazy } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import useGetUser from 'hooks/userhooks'
import splitText from 'utils/splitText'

const useStyles = makeStyles((theme: Theme) => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const AppHeaderMenus = () => {
	// for dropDownMenu
	const options = ['settings & privacy', 'help and support', 'logout']

	const { AccountIconTextStyle } = useStyles()

	const { push } = useRouter()

	const { name } = useGetUser()

	const firstName = splitText({ text: name, position: 0, divider: ' ' })

	return (
		<>
			<IconButton style={{ borderRadius: '10px' }}>
				<AccountCircleIcon />
				<Typography className={AccountIconTextStyle}>{firstName}</Typography>
			</IconButton>
			<IconButton>
				<AddIcon />{' '}
			</IconButton>
			<IconButton edge='end' onClick={() => push('/message')}>
				<TelegramIcon color='secondary' />
			</IconButton>
			<IconButton>
				<NotificationsIcon />
			</IconButton>
			{/* <Suspense fallback={<CircularProgress />}> */}
			{/* 	<DropDownMenu */}
			{/* 		options={options} */}
			{/* 		aria-controls='fade-menu' */}
			{/* 		aria-haspopup='true' */}
			{/* 		IconComponent={ArrowDropDownCircleIcon} */}
			{/* 	/> */}
			{/* </Suspense> */}
		</>
	)
}

export default AppHeaderMenus
