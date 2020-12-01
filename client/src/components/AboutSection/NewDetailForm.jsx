import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { nanoid } from 'nanoid'

const NewDetailForm = ({ formFields }) => {
	const inputValues = {}

	formFields.forEach(item => (inputValues[`${item}`] = ''))

	console.log(inputValues)

	return (
		<Formik
			initialValues={inputValues}
			validate={values => {
				const errors = {}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					{formFields.map(item => (
						<>
							{' '}
							<Field
								key={nanoid()}
								component={TextField}
								name={item}
								type='text'
								label={item}
							/>{' '}
							<br />{' '}
						</>
					))}

					{isSubmitting && <LinearProgress />}
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						done
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default NewDetailForm
