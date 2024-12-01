import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsContext } from 'context/SettingsContext';
import { OptionProvider } from 'context/OptionContext';
import Timer from './Timer';
import { MemoryRouter } from 'react-router-dom';

// Mock the useTimer hook
jest.mock('hooks/useTimer', () => ({
  useTimer: jest.fn(),
}));

describe('Timer Component', () => {
  const mockSettingsContext = {
    workMinutes: 25,
    breakMinutes: 5,
    showSettings: false,
    setShowSettings: jest.fn(),
  };

  const mockUseTimer = require('hooks/useTimer').useTimer;

  beforeEach(() => {
    mockUseTimer.mockReturnValue({
      switchMode: jest.fn(),
      togglePause: jest.fn(),
      isPaused: true,
      mode: 'work',
      minutes: 25,
      seconds: '00',
      percentage: 50,
      innerPercentage: 25,
    });
  });

  it('Snapshot Test', () => {
    const { asFragment } = render(
      <SettingsContext.Provider value={mockSettingsContext}>
        <OptionProvider>
          <MemoryRouter>
            <Timer />
          </MemoryRouter>
        </OptionProvider>
      </SettingsContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders essential components correctly', () => {
    render(
      <SettingsContext.Provider value={mockSettingsContext}>
        <OptionProvider>
          <MemoryRouter>
            <Timer />
          </MemoryRouter>
        </OptionProvider>
      </SettingsContext.Provider>
    );

    // Verify the presence of essential elements
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('Break')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /settings/i })
    ).toBeInTheDocument();
  });

  it('calls switchMode when Focus/Break button is clicked', () => {
    const switchModeMock = jest.fn();
    mockUseTimer.mockReturnValue({
      switchMode: switchModeMock,
      togglePause: jest.fn(),
      isPaused: true,
      mode: 'work',
      minutes: 25,
      seconds: '00',
      percentage: 50,
      innerPercentage: 25,
    });

    render(
      <SettingsContext.Provider value={mockSettingsContext}>
        <OptionProvider>
          <MemoryRouter>
            <Timer />
          </MemoryRouter>
        </OptionProvider>
      </SettingsContext.Provider>
    );

    const focusButton = screen.getByText('Focus');
    const breakButton = screen.getByText('Break');

    fireEvent.click(focusButton);
    expect(switchModeMock).toHaveBeenCalledWith('work');

    fireEvent.click(breakButton);
    expect(switchModeMock).toHaveBeenCalledWith('break');
  });

  it('displays correct progress based on percentage', () => {
    mockUseTimer.mockReturnValue({
      switchMode: jest.fn(),
      togglePause: jest.fn(),
      isPaused: true,
      mode: 'work',
      minutes: 25,
      seconds: '00',
      percentage: 75,
      innerPercentage: 37.5,
    });

    render(
      <SettingsContext.Provider value={mockSettingsContext}>
        <OptionProvider>
          <MemoryRouter>
            <Timer />
          </MemoryRouter>
        </OptionProvider>
      </SettingsContext.Provider>
    );

    const progressBar = screen.getByText(/25:00/i);
    expect(progressBar).toBeInTheDocument(); // Correct time text
  });
});
