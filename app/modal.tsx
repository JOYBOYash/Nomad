import { Link, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { COLORS } from '@/constants/colors';
import { useEvents } from '@/context/EventContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { createEvent } = useEvents();

  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;
  const textColor = isDark ? COLORS.text.dark.body : COLORS.text.light.body;
  const inputBg = isDark ? COLORS.background.cardDark : COLORS.input.background;
  const inputBorder = isDark ? COLORS.input.border : COLORS.input.border;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Error', 'Please enter a date');
      return;
    }
    if (!time.trim()) {
      Alert.alert('Error', 'Please enter a time');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    setLoading(true);
    try {
      await createEvent({
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        maxAttendees: maxAttendees ? parseInt(maxAttendees, 10) : undefined,
      });
      Alert.alert('Success', 'Event created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={[styles.title, { color: headingColor }]}>
          Create Event
        </ThemedText>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: textColor }]}>Event Title *</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              placeholder="Enter event title"
              placeholderTextColor={COLORS.input.placeholder}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: textColor }]}>Description *</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              placeholder="Describe your event"
              placeholderTextColor={COLORS.input.placeholder}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <ThemedText style={[styles.label, { color: textColor }]}>Date *</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
                placeholder="e.g., 2024-12-25"
                placeholderTextColor={COLORS.input.placeholder}
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <ThemedText style={[styles.label, { color: textColor }]}>Time *</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
                placeholder="e.g., 3:00 PM"
                placeholderTextColor={COLORS.input.placeholder}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: textColor }]}>Location *</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              placeholder="Enter location"
              placeholderTextColor={COLORS.input.placeholder}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: textColor }]}>Max Attendees (optional)</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              placeholder="Leave empty for unlimited"
              placeholderTextColor={COLORS.input.placeholder}
              value={maxAttendees}
              onChangeText={setMaxAttendees}
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: loading ? COLORS.button.disabledBackground : COLORS.brand.primary }
            ]}
            onPress={handleCreateEvent}
            disabled={loading}
          >
            <ThemedText style={styles.createButtonText}>
              {loading ? 'Creating...' : 'Create Event'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <Link href="/(tabs)/explore" dismissTo style={styles.link}>
          <ThemedText type="link">Cancel</ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  createButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: COLORS.button.primaryText,
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
