import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/connectionStatus.styles';

const states = {
  connected: { label: 'LIVE', color: '#65D6A6', background: 'rgba(101, 214, 166, 0.14)' },
  connecting: { label: 'CONNECTING', color: '#F0C46E', background: 'rgba(240, 196, 110, 0.14)' },
  disconnected: { label: 'RECONNECTING', color: '#FFA3A3', background: 'rgba(255, 163, 163, 0.14)' },
};

export default function ConnectionStatus({ status }) {
  const state = states[status] || states.disconnected;
  return <View style={[styles.pill, { backgroundColor: state.background }]}><View style={[styles.dot, { backgroundColor: state.color }]} /><Text style={[styles.label, { color: state.color }]}>{state.label}</Text></View>;
}
