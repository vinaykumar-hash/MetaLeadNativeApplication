import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/emptyState.styles';

export default function EmptyState({ connectionStatus }) {
  const isLive = connectionStatus === 'connected';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLive ? 'Inbox is ready' : 'Connecting your inbox'}</Text>
      <Text style={styles.subtitle}>{isLive ? 'New leads will appear here as soon as Meta sends them.' : 'We are trying to reconnect to your lead server.'}</Text>
    </View>
  );
}
