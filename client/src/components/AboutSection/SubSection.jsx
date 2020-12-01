import React from 'react'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SectionDetails from 'components/AboutSection/SectionDetails'

class Section {
	constructor(name, Component) {
		this.name = name
		this.Component = Component
	}

	addProps(props) {
		this.props = props
		this.props.buttonText = this.name
		return this
	}
}

const SubSection = ({ buttonText }) => {
	return (
		<>
			<SectionDetails />
			<Divider light />
			<Button variant='contained' color='secondary'>
				Add a new {buttonText}
			</Button>
		</>
	)
}

const addButtonText = text => ({ buttonText: `Add a new ${text}` })

const education = new Section('Education', SubSection).addProps(
	addButtonText('School')
)
const experience = new Section('Experience', SubSection).addProps(
	addButtonText('Experience')
)
const placesLived = new Section('Places Lived', SubSection).addProps(
	addButtonText('Place')
)

const options = [education, experience, placesLived]

export default options
