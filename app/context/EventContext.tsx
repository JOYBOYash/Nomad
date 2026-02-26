import { useAuth } from '@/context/AuthContext';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CreateEventInput, Event } from '../types/event';

// Generate a simple UUID (for demo purposes - in production use a proper UUID library)
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

interface EventContextType {
  events: Event[];
  loading: boolean;
  createEvent: (eventData: CreateEventInput) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  joinEvent: (eventId: string) => Promise<void>;
  leaveEvent: (eventId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Sample events for demonstration
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Coffee Meetup',
    description: 'Join us for a casual coffee meetup to discuss new projects and network.',
    date: '2024-12-20',
    time: '10:00 AM',
    location: 'Central Park Cafe',
    organizerId: 'user1',
    organizerName: 'John Doe',
    attendees: ['user1', 'user2'],
    maxAttendees: 10,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Tech Talk: React Native',
    description: 'Learn about the latest trends in React Native development.',
    date: '2024-12-22',
    time: '2:00 PM',
    location: 'Tech Hub Downtown',
    organizerId: 'user2',
    organizerName: 'Jane Smith',
    attendees: ['user2'],
    maxAttendees: 50,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Weekend Hiking Trip',
    description: 'Explore the beautiful trails together. All skill levels welcome!',
    date: '2024-12-28',
    time: '8:00 AM',
    location: 'Mountain Trail Head',
    organizerId: 'user3',
    organizerName: 'Mike Johnson',
    attendees: ['user3', 'user4', 'user5'],
    maxAttendees: 20,
    createdAt: new Date(),
  },
];

export function EventProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load events (in production, this would fetch from Firebase)
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(sampleEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const createEvent = async (eventData: CreateEventInput) => {
    if (!user) {
      throw new Error('You must be logged in to create an event');
    }

    const newEvent: Event = {
      id: generateId(),
      ...eventData,
      organizerId: user.uid,
      organizerName: user.email?.split('@')[0] || 'Unknown',
      attendees: [user.uid],
      createdAt: new Date(),
    };

    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const deleteEvent = async (eventId: string) => {
    if (!user) {
      throw new Error('You must be logged in to delete an event');
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== user.uid) {
      throw new Error('You can only delete your own events');
    }

    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  };

  const joinEvent = async (eventId: string) => {
    if (!user) {
      throw new Error('You must be logged in to join an event');
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.attendees.includes(user.uid)) {
      throw new Error('You have already joined this event');
    }

    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      throw new Error('This event is full');
    }

    setEvents(prevEvents =>
      prevEvents.map(e =>
        e.id === eventId
          ? { ...e, attendees: [...e.attendees, user.uid] }
          : e
      )
    );
  };

  const leaveEvent = async (eventId: string) => {
    if (!user) {
      throw new Error('You must be logged in to leave an event');
    }

    setEvents(prevEvents =>
      prevEvents.map(e =>
        e.id === eventId
          ? { ...e, attendees: e.attendees.filter(uid => uid !== user.uid) }
          : e
      )
    );
  };

  const value = {
    events,
    loading,
    createEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
