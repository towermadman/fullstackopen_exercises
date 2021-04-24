import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
	onSubmit,
	username,
	password,
	setUsername,
	setPassword
}) => (
	<div>
		<h2>Log in to application</h2>

		<form onSubmit={onSubmit}>
			<div>
				username
				<input
					type="text"
					id="username"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					id="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit" id="login-button">login</button>
		</form>
	</div>
)

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default Login