import LinearBufferProgress, {
	FAILED,
} from 'components/Progress/LinearBufferProgress'
import Dialog from '@material-ui/core/Dialog'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import makeBase64Image from 'utils/makeBase64Image'
import { useEffect, useState } from 'react'

export interface CustomFile extends File {
	previewLink: string
}

interface Props {
	previewOpen: boolean
	setPreviewOpen: Function
	setRejected: (bool: boolean) => void
	file: CustomFile
	action: (file: ArrayBuffer | null | string) => void
}

const ImagePreviewModal = ({
	setPreviewOpen,
	previewOpen,
	file,
	setRejected,
	action,
}: Props) => {
	const [showProgress, setShowProgress] = useState(false)
	const [success, setSuccess] = useState<null | boolean | string>(null)
	const [shouldStop, setShouldStop] = useState(false)
	const progressProps = { shouldStop, setShouldStop, success }

	const handleClose = () => {
		// setShowProgress(true)
		makeBase64Image(file, action)
		setPreviewOpen(false)
		setUploadModalOpen(false)
	}

	const handleReject = () => {
		setRejected(true)
		setPreviewOpen(false)
	}

	return (
		<Dialog
			fullWidth
			aria-labelledby='simple-dialog-title'
			maxWidth='lg'
			open={previewOpen}
		>
			<DialogContent style={{ padding: 0 }}>
				<CardMedia
					style={{ height: 0, paddingTop: '56.25%' }}
					image={file.previewLink}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleReject}>discard</Button>
				<Button onClick={handleClose}>OK</Button>
			</DialogActions>

			{/* {showProgress && ( */}
			{/* <Dialog open={showProgress}> */}
			{/* 	<LinearBufferProgress {...progressProps} /> */}
			{/* </Dialog> */}
			{/* )} */}
		</Dialog>
	)
}

export default ImagePreviewModal
