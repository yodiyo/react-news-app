import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('renders the title prop', () => {
		render(<Header title="Test Headline" />);
		expect(screen.getByText('Test Headline')).toBeInTheDocument();
	});

	it('renders a heading element', () => {
		render(<Header title="My News App" />);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('My News App');
	});
});
