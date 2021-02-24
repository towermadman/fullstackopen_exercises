const Person = ({ person, deletePerson }) => (
	<div>
		<p>{person.name} {person.number}
			<button type="button" onClick={() => deletePerson(person.id, person.name)}>delete</button>
		</p>
	</div>
)

export default Person