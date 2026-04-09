import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useVaccines } from '../context/VaccinesContext';
import VaccineCard from '../components/VaccineCard';
import { colors, radius, shadow, spacing } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { vaccines, isLoading } = useVaccines();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Загрузка данных...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <VaccineCard
            vaccine={item}
            onPress={() => navigation.navigate('VaccineDetails', { vaccineId: item.id })}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Text style={styles.screenTitle}>Мои вакцинации</Text>
            <Text style={styles.screenSubtitle}>
              Храните даты вакцинации, срок действия и историю ревакцинаций.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Пока нет записей</Text>
            <Text style={styles.emptyText}>
              Добавьте первую вакцину, чтобы отслеживать срок её действия.
            </Text>
          </View>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('AddVaccine')}
      >
        <Text style={styles.addButtonText}>+ Добавить вакцину</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 110,
  },
  headerBox: {
    marginBottom: spacing.md,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 15,
    color: colors.mutedText,
    lineHeight: 21,
  },
  emptyState: {
    marginTop: 60,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadow,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.mutedText,
    textAlign: 'center',
    lineHeight: 20,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    color: colors.mutedText,
    fontSize: 14,
  },
});