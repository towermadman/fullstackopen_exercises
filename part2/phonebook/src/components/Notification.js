const Notification = ({ notification }) => {
	if (notification === null) return null

	const successStyle = {
		color: 'green',
		fontSize: 20,
		background: 'lightgrey',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	const failureStyle = {
		color: 'red',
		fontSize: 20,
		background: 'lightgrey',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	return (
		<div style={notification.success ? successStyle : failureStyle}>
			{notification.message}
		</div>
	)
}

export default Notification