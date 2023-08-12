import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Messages from './index.page.tsx';
import useUser from '@/components/useUser';
import { useRouter } from 'next/router';

jest.mock('@/components/AppLayout', () => ({ children }) => <div>{children}</div>);
jest.mock('@/components/useUser', () => jest.fn());
jest.mock('./components/MessagePanel', () => () => <div>MessagePanel</div>);
jest.mock('./components/ContactPanel', () => () => <div>ContactPanel</div>);
jest.mock('./components/ChatBotPanel', () => () => <div>ChatBotPanel</div>);
jest.mock('./components/AddChatButton', () => () => <div>AddChatButton</div>);
jest.mock('./components/AddChatModal', () => () => <div>AddChatModal</div>);
jest.mock('../axiosFrontend', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

describe('Messages Component', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
          route: '/',
          pathname: '/',
          query: '',
          asPath: '',
          replace: jest.fn(),
        });
      });


    it('should render loading spinner when loading', () => {
        useUser.mockReturnValue([{ id: 1 }, false]);
        const { container } = render(<Messages />);
        console.log(container.innerHTML); // Log the rendered output
        expect(screen.getByText('Loading your chats...')).toBeInTheDocument();
      });
      
      
      
      
    it('should render ContactPanel when no chat is selected', async () => {
    useUser.mockReturnValue([{ id: 1 }, false]);
    render(<Messages />);
    await waitFor(() => {
        expect(screen.getByTestId('contact-panel')).toBeInTheDocument(); // Assuming you've set a test-id on the ContactPanel component
    });
    });


    it('should render MessagePanel when a non-AI chat is selected', async () => {
        useUser.mockReturnValue([{ id: 1 }, false]);
        render(<Messages />);
        // Simulate selection of non-AI chat room here
        await waitFor(() => {
          expect(screen.getByTestId('message-panel')).toBeInTheDocument(); // Assuming you've set a test-id on the MessagePanel component
        });
      });
      

  it('should render ChatBotPanel when an AI chat is selected', async () => {
    useUser.mockReturnValue([{ id: 1 }, false]);
    render(<Messages />);
    // Simulate the selection of an AI chat
    // You may need to add logic to simulate the selection, such as triggering a click event
    await waitFor(() => {
      expect(screen.getByText('ChatBotPanel')).toBeInTheDocument();
    });
  });

  // Additional tests can be added here for other interactions and behaviors
});
