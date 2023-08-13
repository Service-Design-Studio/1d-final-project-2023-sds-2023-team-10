import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './index.page.tsx';
import useUser from '@/components/useUser';

// Mocking the necessary modules
jest.mock('@/components/useUser');
jest.mock('@/components/AppLayout', () => ({ children }) => <div>{children}</div>);
jest.mock('@/components/withAuth', () => (Component) => Component);
jest.mock('./pregnantcard', () => () => <div data-testid="pregnant-card">PregnantCard</div>);
jest.mock('./ArticleList', () => () => <div>ArticleList</div>);

const mockUser = {
  id: 1,
  first_name: 'John',
  second_name: 'Doe',
  pregnancy_week: 10,
};

describe('Home Component', () => {
  test('renders loading spinner when user data is not yet loaded', () => {
    useUser.mockReturnValue([null, true]); // Simulate loading

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders greeting with user name when user data is loaded', async () => {
    useUser.mockReturnValue([mockUser, false]);

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(`Hello, ${mockUser.first_name} ${mockUser.second_name}!`)
      ).toBeInTheDocument();
    });
  });

  test('renders pregnant card when user is pregnant', async () => {
    useUser.mockReturnValue([mockUser, false]);

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pregnant-card')).toBeInTheDocument();
    });
  });

  test('does not render pregnant card when user is not pregnant', async () => {
    useUser.mockReturnValue([{ ...mockUser, pregnancy_week: null }, false]);

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('pregnant-card')).not.toBeInTheDocument();
    });
  });
});
