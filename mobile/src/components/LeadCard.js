import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/leadCard.styles';

export default function LeadCard({ lead, isNew }) {
  const name = lead.name || 'New enquiry';

  return (
    <View style={[styles.card, isNew && styles.newCard]}>
      <View style={styles.topRow}>
        <View style={styles.identity}>
          <View style={styles.nameBlock}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.submitted}>Received {formatTime(lead.createdAt)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <Detail label="EMAIL" value={lead.email} />
      <Detail label="PHONE" value={lead.phone} />
    </View>
  );
}

function Detail({ label, value }) {
  return <View style={styles.detail}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue} numberOfLines={1}>{value || 'Not provided'}</Text></View>;
}

function formatTime(isoString) {
  if (!isoString) return 'just now';
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return new Date(isoString).toLocaleString();
}
