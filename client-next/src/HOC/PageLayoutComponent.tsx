import React, { ReactNode } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import BackgroundPaper from 'HOC/BackgroundPaper'

interface Props {
	Drawer?: boolean | ReactNode
	Content?: boolean | ReactNode
	RightSection?: boolean | ReactNode
}

const PageLayoutComponent = ({ Drawer, Content, RightSection }: Props) => {
	const matches = useMediaQuery('(min-width:960px)')

	const contentWidth = () => {
		if (Drawer && !RightSection) {
			return 8
		}
		if (!Drawer && RightSection) {
			return 8
		}
		return 6
	}

	contentWidth()

	return (
		<BackgroundPaper>
			<Grid
				container
				spacing={Drawer && RightSection ? 2 : 0}
				justify='space-evenly'
			>
				{matches && typeof Drawer === 'function' && (
					<Grid item md={3}>
						<Drawer />
					</Grid>
				)}
				{Content && typeof Content === 'function' && (
					<Grid item xs={10} md={contentWidth()}>
						<Content />
					</Grid>
				)}
				{matches && typeof RightSection === 'function' && (
					<Grid item md={3}>
						<RightSection />
					</Grid>
				)}
			</Grid>
		</BackgroundPaper>
	)
}

PageLayoutComponent.defaultProps = {
	Drawer: false,
	Content: false,
	RightSection: false,
}

export default PageLayoutComponent