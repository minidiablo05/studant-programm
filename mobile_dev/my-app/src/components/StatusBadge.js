import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/theme';

const palette = {
  success: {
    backgroundColor: colors.lightSuccess,
    textColor: colors.success,
  },
  warning: {
    backgroundColor: colors.lightWarning,
    textColor: colors.warning,
  },
  danger: {
    backgroundColor: colors.lightDanger,
    textColor: colors.danger,
  },
};

export default function StatusBadge({ label, type = 'success' }) {
  const current = palette[type] || palette.success;

  return (
    <View style={[styles.badge, { backgroundColor: current.backgroundColor }]}>
      <Text style={[styles.label, { color: current.textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});