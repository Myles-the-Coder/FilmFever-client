import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../redux/features/filterSlice';

function FilterInput({ filter }) {
	const dispatch = useDispatch();

	return (
		<Form.Control
			className='w-75 m-auto'
			onChange={e => dispatch(setFilter(e.target.value))}
			value={filter}
			placeholder='Filter Movies...'
		/>
	);
}

export default FilterInput;
