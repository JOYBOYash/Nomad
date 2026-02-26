/**
 * Event type definitions for the Nomad app
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  organizerName: string;
  attendees: string[];
  maxAttendees?: number;
  createdAt: Date;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees?: number;
}
