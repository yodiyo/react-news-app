import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectComponent from './SelectComponent';

const options = [
	{ value: 'gb', label: 'United Kingdom' },
	{ value: 'us', label: 'United States' },
	{ value: 'fr', label: 'France' },
];

describe('SelectComponent', () => {
	it('renders a select element', () => {
		render(<SelectComponent options={options} onChange={() => {}} value="gb" />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders all options', () => {
		render(<SelectComponent options={options} onChange={() => {}} value="gb" />);
		expect(screen.getByRole('option', { name: 'United Kingdom' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'United States' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'France' })).toBeInTheDocument();
	});

	it('has the correct selected value', () => {
		render(<SelectComponent options={options} onChange={() => {}} value="us" />);
		expect(screen.getByRole('combobox')).toHaveValue('us');
	});

	it('calls onChange when a new option is selected', () => {
		const handleChange = jest.fn();
		render(<SelectComponent options={options} onChange={handleChange} value="gb" />);
		fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fr' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it('renders with a given id', () => {
		render(<SelectComponent options={options} onChange={() => {}} value="gb" id="selectCountry" />);
		expect(document.getElementById('selectCountry')).toBeInTheDocument();
	});
});
