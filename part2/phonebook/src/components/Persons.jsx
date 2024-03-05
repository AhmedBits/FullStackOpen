import Person from "./Person"

const Persons = ({ names }) => {
	return (
		names.map(person => 
			<Person 
				key={person.name} 
				name={person.name}
				number={person.number}
			/>
		)
	)
}

export default Persons