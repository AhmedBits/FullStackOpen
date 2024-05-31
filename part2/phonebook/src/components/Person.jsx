import Button from "./Button"

const Person = ({id, name, number, handleClick}) => {
	return (
		<p>
			{name}: {number} {
				<Button 
					handleClick={() => handleClick(id)}
					type='submit'
					text='delete'
				/>
			}
		</p>
	)
}

export default Person