import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useVaccines } from '../context/VaccinesContext';
import { colors, radius, shadow, spacing } from '../styles/theme';
import { formatDate, toISODateString } from '../utils/dateUtils';
import { calculateExpiryDate } from '../utils/vaccineHelpers';

export default function AddVaccineScreen({ navigation }) {
  const { addVaccine } = useVaccines();

  const [name, setName] = useState('');
  const [vaccinationDateInput, setVaccinationDateInput] = useState('');
  const [durationValue, setDurationValue] = useState('12');
  const [durationUnit, setDurationUnit] = useState('months');

  const normalizedVaccinationDate = useMemo(() => {
    const parts = vaccinationDateInput.split('.');
    if (parts.length !== 3) return null;

    const [day, month, year] = parts;
    if (!day || !month || !year) return null;

    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (Number.isNaN(parsedDate.getTime())) return null;
    if (parsedDate.getDate() !== Number(day)) return null;
    if (parsedDate.getMonth() !== Number(month) - 1) return null;
    if (parsedDate.getFullYear() !== Number(year)) return null;

    return toISODateString(parsedDate);
  }, [vaccinationDateInput]);

  const previewExpiryDate = useMemo(() => {
    if (!normalizedVaccinationDate || !durationValue) return null;

    return calculateExpiryDate({
      vaccinationDate: normalizedVaccinationDate,
      durationUnit,
      durationValue: Number(durationValue),
    });
  }, [normalizedVaccinationDate, durationUnit, durationValue]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите название вакцины.');
      return;
    }

    if (!normalizedVaccinationDate) {
      Alert.alert('Ошибка', 'Введите корректную дату в формате ДД.ММ.ГГГГ.');
      return;
    }

    if (!durationValue || Number(durationValue) <= 0) {
      Alert.alert('Ошибка', 'Укажите корректный срок действия вакцины.');
      return;
    }

    addVaccine({
      name,
      vaccinationDate: normalizedVaccinationDate,
      durationUnit,
      durationValue: Number(durationValue),
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Новая запись</Text>

        <Text style={styles.label}>Название вакцины</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Например: Грипп"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
        />

        <Text style={styles.label}>Дата проведения вакцины</Text>
        <TextInput
          value={vaccinationDateInput}
          onChangeText={setVaccinationDateInput}
          placeholder="ДД.ММ.ГГГГ"
          placeholderTextColor={colors.mutedText}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Срок действия</Text>
        <View style={styles.durationRow}>
          <TextInput
            value={durationValue}
            onChangeText={setDurationValue}
            keyboardType="numeric"
            style={[styles.input, styles.durationInput]}
          />

          <View style={styles.segmentedControl}>
            <Pressable
              style={[
                styles.segmentButton,
                durationUnit === 'months' && styles.segmentButtonActive,
              ]}
              onPress={() => setDurationUnit('months')}
            >
              <Text
                style={[
                  styles.segmentText,
                  durationUnit === 'months' && styles.segmentTextActive,
                ]}
              >
                Месяцы
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.segmentButton,
                durationUnit === 'years' && styles.segmentButtonActive,
              ]}
              onPress={() => setDurationUnit('years')}
            >
              <Text
                style={[
                  styles.segmentText,
                  durationUnit === 'years' && styles.segmentTextActive,
                ]}
              >
                Годы
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.previewBox}>
          <Text style={styles.previewTitle}>Предпросмотр</Text>
          <Text style={styles.previewText}>
            Дата вакцинации: {normalizedVaccinationDate ? formatDate(normalizedVaccinationDate) : '—'}
          </Text>
          <Text style={styles.previewText}>
            Действует до: {previewExpiryDate ? formatDate(previewExpiryDate) : '—'}
          </Text>
        </View>
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Сохранить вакцину</Text>
      </Pressable>
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
    ...shadow,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  durationInput: {
    width: 90,
  },
  segmentedControl: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  hintText: {
    marginTop: 10,
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  previewBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.lightPrimary,
    borderRadius: 16,
    padding: spacing.md,
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  saveButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    ...shadow,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});