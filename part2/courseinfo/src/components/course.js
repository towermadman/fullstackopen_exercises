const Header = ({ course }) => {
	return (
		<h1>{course.name}</h1>
	)
}

const Total = ({ course }) => {
	const sum = course.parts.reduce(
		((total, part) => total + part.exercises), 0
	)

	return(
		<b>Number of exercises {sum}</b>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>    
	)
}

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</div>
	)
}

const Course = ({ course }) => (
	<>
		<Header course={course} />
		<Content course={course} />
		<Total course={course} />
	</>
)

export default Course