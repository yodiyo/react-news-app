import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
	it('renders the footer element', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	});

	it('renders the GNews link', () => {
		render(<Footer />);
		const gnewsLink = screen.getByRole('link', { name: /gnews/i });
		expect(gnewsLink).toHaveAttribute('href', 'https://gnews.io/');
	});

	it('renders the copyright text', () => {
		render(<Footer />);
		expect(screen.getByText(/Yorick Brown/i)).toBeInTheDocument();
	});
});
