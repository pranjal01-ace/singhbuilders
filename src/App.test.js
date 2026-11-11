import { render, screen } from '@testing-library/react';
import App from './App';
import { formatProperty } from './services/propertyService';

test('renders Singh Builder brand in App', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/Singh Builder/i);
  expect(brandElements.length).toBeGreaterThan(0);
});

test('formatProperty handles raw backend data correctly', () => {
  const raw = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Luxury Floor',
    slug: 'luxury-floor',
    category: 'RESIDENTIAL',
    property_type: 'BUILDER_FLOOR',
    price: 35000000,
    area: 2400,
    area_unit: 'SQFT',
    bedrooms: 4,
    bathrooms: 4,
    location: {
      name: 'South Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      slug: 'south-delhi'
    },
    images: [
      { url: 'https://example.com/cover.jpg', is_cover: true },
      { url: 'https://example.com/2.jpg', is_cover: false }
    ],
    amenities: [
      { name: 'Lift' },
      { name: 'Power Backup' }
    ]
  };

  const formatted = formatProperty(raw);
  expect(formatted.title).toBe('Luxury Floor');
  expect(formatted.category).toBe('residential');
  expect(formatted.type).toBe('Builder Floor');
  expect(formatted.coverImage).toBe('https://example.com/cover.jpg');
  expect(formatted.images).toEqual(['https://example.com/cover.jpg', 'https://example.com/2.jpg']);
  expect(formatted.amenities).toEqual(['Lift', 'Power Backup']);
  expect(formatted.location).toBe('South Delhi');
  expect(formatted.city).toBe('New Delhi');
});
