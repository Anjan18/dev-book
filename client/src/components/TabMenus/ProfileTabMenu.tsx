import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

import { FOLLOWING, FOLLOWERS } from 'variables/global'
import { useFollowers, useFollowing } from 'hooks/useFollow'

const AboutTab = dynamic(() => import('components/Profile/Tabs/About/About'))
const FollowSection = dynamic(
	() => import('components/Profile/Tabs/Follow/Follow')
)

class TabBuilder {
	Component: Function

	name: string

	hook?: Function

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}

	addHook(hook: Function) {
		this.hook = hook
		return this
	}
}

const About = new TabBuilder('About', AboutTab)

const Followers: TabBuilder = new TabBuilder(FOLLOWERS, FollowSection).addHook(
	useFollowers
)

const Following: TabBuilder = new TabBuilder(FOLLOWING, FollowSection).addHook(
	useFollowing
)

const tabs: TabBuilder[] = [About, Followers, Following]

const TabPanel = ({ value, ...other }: any) => {
	const { Component, ...others } = tabs[value]

	return (
		<div
			role='tabpanel'
			id={`scrollable-auto-tabpanel-${value}`}
			aria-labelledby={`scrollable-auto-tab-${value}`}
			{...other}
		>
			<Component {...others} />
		</div>
	)
}

const a11yProps = (index: number) => {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme: any) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		marginBottom: '10vh',
	},
	tabsContainer: {
		'& > .MuiTabs-scroller': {
			'& > .MuiTabs-flexContainer': {
				justifyContent: 'space-evenly',
			},
		},
	},
}))

const HorizontalMenu = () => {
	const {
		query: { show },
	} = useRouter()

	const { root, tabsContainer } = useStyles()
	const [value, setValue] = React.useState(0)

	useEffect(() => {
		if (!show) {
			setValue(0)
		} else {
			setValue(parseInt(show as string, 10))
		}
	}, [show])

	const handleClick = (index: number) => {
		const currentURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`

		const newURL = new URL(currentURL)
		newURL.searchParams.set('show', index.toString())
		window.history.pushState({}, '', (newURL as unknown) as string)
		setValue(index)
	}

	return (
		<div className={root}>
			<AppBar position='static' color='default'>
				<Tabs
					className={tabsContainer}
					value={value}
					indicatorColor='secondary'
					textColor='secondary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					{tabs.map((item, index) => (
						<Tab
							key={nanoid()}
							label={item.name}
							{...a11yProps(index)}
							onClick={() => handleClick(index)}
						/>
					))}
				</Tabs>
			</AppBar>

			<TabPanel value={value} />
		</div>
	)
}

export default HorizontalMenu