import Person from "./Person"

const Persons = ({ names, handleClick }) => {
	return (
		names.map(person => 
			<Person 
				key={person.id}
				id={person.id} 
				name={person.name}
				number={person.number}
				handleClick={handleClick}
			/>
		)
	)
}

export default Persons