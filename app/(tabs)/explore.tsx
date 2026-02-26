import { Link } from 'expo-router';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Event } from '../types/event';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuth();
  const { events, loading, joinEvent, leaveEvent } = useEvents();

  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;
  const textColor = isDark ? COLORS.text.dark.body : COLORS.text.light.body;
  const captionColor = isDark ? COLORS.text.dark.caption : COLORS.text.light.caption;
  const cardBg = isDark ? COLORS.background.cardDark : COLORS.background.cardLight;

  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent(eventId);
      Alert.alert('Success', 'You have joined the event!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    try {
      await leaveEvent(eventId);
      Alert.alert('Success', 'You have left the event.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => {
    const isOrganizer = user?.uid === item.organizerId;
    const isAttending = user ? item.attendees.includes(user.uid) : false;
    const isFull = item.maxAttendees ? item.attendees.length >= item.maxAttendees : false;

    return (
      <ThemedView style={[styles.eventCard, { backgroundColor: cardBg }]}>
        <View style={styles.eventHeader}>
          <ThemedText type="subtitle" style={{ color: headingColor }}>
            {item.title}
          </ThemedText>
          {isOrganizer && (
            <View style={[styles.organizerBadge, { backgroundColor: COLORS.brand.primary }]}>
              <ThemedText style={styles.organizerBadgeText}>Organizer</ThemedText>
            </View>
          )}
        </View>
        
        <ThemedText style={[styles.eventDescription, { color: textColor }]}>
          {item.description}
        </ThemedText>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailRow}>
            <MaterialIcons name="event" size={16} color={COLORS.brand.primary} />
            <ThemedText style={[styles.eventDetailText, { color: captionColor }]}>
              {item.date} at {item.time}
            </ThemedText>
          </View>
          
          <View style={styles.eventDetailRow}>
            <MaterialIcons name="location-on" size={16} color={COLORS.brand.primary} />
            <ThemedText style={[styles.eventDetailText, { color: captionColor }]}>
              {item.location}
            </ThemedText>
          </View>
          
          <View style={styles.eventDetailRow}>
            <MaterialIcons name="person" size={16} color={COLORS.brand.primary} />
            <ThemedText style={[styles.eventDetailText, { color: captionColor }]}>
              Organized by {item.organizerName}
            </ThemedText>
          </View>
          
          <View style={styles.eventDetailRow}>
            <MaterialIcons name="group" size={16} color={COLORS.brand.primary} />
            <ThemedText style={[styles.eventDetailText, { color: captionColor }]}>
              {item.attendees.length} {item.maxAttendees ? `/ ${item.maxAttendees}` : ''} attendees
            </ThemedText>
          </View>
        </View>
        
        {!isOrganizer && user && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              { 
                backgroundColor: isAttending 
                  ? COLORS.button.secondaryBackground 
                  : (isFull ? COLORS.button.disabledBackground : COLORS.brand.primary)
              }
            ]}
            onPress={() => isAttending ? handleLeaveEvent(item.id) : handleJoinEvent(item.id)}
            disabled={isFull && !isAttending}
          >
            <MaterialIcons 
              name={isAttending ? "close" : "add"} 
              size={20} 
              color={isAttending ? COLORS.button.secondaryText : COLORS.button.primaryText} 
            />
            <ThemedText style={[
              styles.actionButtonText, 
              { color: isAttending ? COLORS.button.secondaryText : COLORS.button.primaryText }
            ]}>
              {isAttending ? 'Leave Event' : (isFull ? 'Event Full' : 'Join Event')}
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    );
  };

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyContainer}>
      <MaterialIcons name="event-busy" size={64} color={captionColor} />
      <ThemedText type="subtitle" style={[styles.emptyTitle, { color: headingColor }]}>
        No Events Yet
      </ThemedText>
      <ThemedText style={[styles.emptySubtitle, { color: textColor }]}>
        No events you can attend yet. Be the first to create one!
      </ThemedText>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: COLORS.header.explore.light, 
        dark: COLORS.header.explore.dark 
      }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="paperplane.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <View style={styles.headerRow}>
          <ThemedText type="title" style={{ color: headingColor }}>
            Explore
          </ThemedText>
          
          {user && (
            <Link href="/modal" asChild>
              <TouchableOpacity style={styles.createButton}>
                <MaterialIcons name="add" size={20} color={COLORS.button.primaryText} />
                <ThemedText style={styles.createButtonText}>
                  Create Event
                </ThemedText>
              </TouchableOpacity>
            </Link>
          )}
        </View>
        
        <ThemedText style={[styles.sectionTitle, { color: captionColor }]}>
          {loading ? 'Loading events...' : `Upcoming Events (${events.length})`}
        </ThemedText>
        
        {events.length > 0 ? (
          <FlatList
            data={events}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          renderEmptyState()
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  createButtonText: {
    color: COLORS.button.primaryText,
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    gap: 12,
  },
  eventCard: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  organizerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  organizerBadgeText: {
    color: COLORS.button.primaryText,
    fontSize: 10,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  eventDetails: {
    gap: 6,
    marginTop: 4,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 13,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyTitle: {
    marginTop: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});
