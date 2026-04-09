import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../utils/dateUtils';
import { getVaccineStatus } from '../utils/vaccineHelpers';
import StatusBadge from './StatusBadge';
import { colors, radius, shadow, spacing } from '../styles/theme';

export default function VaccineCard({ vaccine, onPress }) {
  const status = getVaccineStatus(vaccine.expiryDate);

  return (
    <Pressable
      style={[
        styles.card,
        status.colorType === 'success' && styles.successBorder,
        status.colorType === 'warning' && styles.warningBorder,
        status.colorType === 'danger' && styles.dangerBorder,
      ]}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{vaccine.name}</Text>
        <StatusBadge label={status.label} type={status.colorType} />
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Дата вакцинации</Text>
        <Text style={styles.value}>{formatDate(vaccine.vaccinationDate)}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Действует до</Text>
        <Text style={styles.value}>{formatDate(vaccine.expiryDate)}</Text>
      </View>

      {status.daysLeft !== null && status.daysLeft >= 0 && status.daysLeft <= 30 && (
        <Text style={styles.warningText}>
          Напоминание: осталось {status.daysLeft} дн.
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  successBorder: {
    borderLeftWidth: 5,
    borderLeftColor: colors.success,
  },
  warningBorder: {
    borderLeftWidth: 5,
    borderLeftColor: colors.warning,
  },
  dangerBorder: {
    borderLeftWidth: 5,
    borderLeftColor: colors.danger,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  infoBlock: {
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: colors.mutedText,
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  warningText: {
    marginTop: spacing.sm,
    color: colors.warning,
    fontWeight: '700',
  },
});