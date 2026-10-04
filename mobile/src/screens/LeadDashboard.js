import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import socket from '../services/socket';
import ConnectionStatus from '../components/ConnectionStatus';
import LeadCard from '../components/LeadCard';
import EmptyState from '../components/EmptyState';
import styles from '../styles/leadDashboard.styles';

export default function LeadDashboard() {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [leads, setLeads] = useState([]);
  const latestLeadIdRef = useRef(null);
  const seenIdsRef = useRef(new Set());

  useEffect(() => {
    const onConnect = () => setConnectionStatus('connected');
    const onDisconnect = () => setConnectionStatus('disconnected');
    const onConnectError = () => setConnectionStatus('disconnected');
    const onNewLead = (lead) => {
      if (!lead?.id || seenIdsRef.current.has(lead.id)) return;
      seenIdsRef.current.add(lead.id);
      latestLeadIdRef.current = lead.id;
      setLeads((currentLeads) => [lead, ...currentLeads]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('new_lead', onNewLead);
    if (socket.connected) onConnect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('new_lead', onNewLead);
    };
  }, []);

  const renderLead = useCallback(
    ({ item }) => <LeadCard lead={item} isNew={item.id === latestLeadIdRef.current} />,
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#13233C" />
      <View style={styles.hero}>
        <Text style={styles.title}>Lead inbox</Text>
        <View style={styles.heroFooter}>
          <ConnectionStatus status={connectionStatus} />
          <View style={styles.sessionCount}>
            <Text style={styles.sessionCountNumber}>{leads.length}</Text>
            <Text style={styles.sessionCountLabel}>THIS SESSION</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={leads}
        renderItem={renderLead}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, leads.length === 0 && styles.emptyList]}
        ListHeaderComponent={leads.length > 0 ? (
          <View style={styles.listHeading}>
            <Text style={styles.listTitle}>Recent enquiries</Text>
            <Text style={styles.listMeta}>{leads.length} received</Text>
          </View>
        ) : null}
        ListEmptyComponent={<EmptyState connectionStatus={connectionStatus} />}
      />
    </SafeAreaView>
  );
}
