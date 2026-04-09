import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import { useVaccines } from '../context/VaccinesContext';
import { colors, radius, shadow, spacing } from '../styles/theme';
import { formatDate } from '../utils/dateUtils';
import { getVaccineStatus } from '../utils/vaccineHelpers';

export default function VaccineDetailsScreen({ route }) {
  const { vaccineId } = route.params;
  const { vaccines } = useVaccines();

  const vaccine = vaccines.find((item) => item.id === vaccineId);

  if (!vaccine) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundTitle}>Запись не найдена</Text>
        <Text style={styles.notFoundText}>
          Возможно, вакцина была удалена или ещё не загружена.
        </Text>
      </View>
    );
  }

  const status = getVaccineStatus(vaccine.expiryDate);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{vaccine.name}</Text>
        <StatusBadge label={status.label} type={status.colorType} />

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Дата вакцинации</Text>
          <Text style={styles.infoValue}>{formatDate(vaccine.vaccinationDate)}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Дата окончания действия</Text>
          <Text style={styles.infoValue}>{formatDate(vaccine.expiryDate)}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Статус</Text>
          <Text
            style={[
              styles.infoValue,
              status.colorType === 'success' && { color: colors.success },
              status.colorType === 'warning' && { color: colors.warning },
              status.colorType === 'danger' && { color: colors.danger },
            ]}
          >
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.historyTitle}>История вакцинации</Text>

        {vaccine.history && vaccine.history.length > 0 ? (
          vaccine.history
            .slice()
            .sort((a, b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate))
            .map((entry, index) => (
              <View key={entry.id || index} style={styles.historyItem}>
                <View style={styles.historyDot} />
                <View style={styles.historyContent}>
                  <Text style={styles.historyIndex}>
                    {index === 0 ? 'Первая вакцинация' : `Ревакцинация #${index}`}
                  </Text>
                  <Text style={styles.historyText}>
                    Дата: {formatDate(entry.vaccinationDate)}
                  </Text>
                  <Text style={styles.historyText}>
                    Действует до: {formatDate(entry.expiryDate)}
                  </Text>
                </View>
              </View>
            ))
        ) : (
          <Text style={styles.emptyHistory}>История пока отсутствует.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  infoSection: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.mutedText,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyIndex: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  historyText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 3,
  },
  emptyHistory: {
    fontSize: 14,
    color: colors.mutedText,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 14,
    color: colors.mutedText,
    textAlign: 'center',
  },
});