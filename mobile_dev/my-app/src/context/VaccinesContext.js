import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadVaccines, saveVaccines } from '../storage/vaccineStorage';
import { calculateExpiryDate, normalizeName } from '../utils/vaccineHelpers';

const VaccinesContext = createContext();

export const VaccinesProvider = ({ children }) => {
  const [vaccines, setVaccines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchVaccines = async () => {
      try {
        const savedVaccines = await loadVaccines();

        if (isMounted) {
          setVaccines(Array.isArray(savedVaccines) ? savedVaccines : []);
        }
      } catch (error) {
        console.log('Ошибка при инициализации данных:', error);

        if (isMounted) {
          setVaccines([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchVaccines();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveVaccines(vaccines);
    }
  }, [vaccines, isLoading]);

  const addVaccine = ({ name, vaccinationDate, durationUnit, durationValue }) => {
    const expiryDate = calculateExpiryDate({
      vaccinationDate,
      durationUnit,
      durationValue,
    });

    const normalizedName = normalizeName(name);

    setVaccines((prevVaccines) => {
      const existingIndex = prevVaccines.findIndex(
        (item) => normalizeName(item.name) === normalizedName
      );

      const newHistoryItem = {
        id: `${Date.now()}`,
        vaccinationDate,
        expiryDate,
      };

      if (existingIndex !== -1) {
        const existingVaccine = prevVaccines[existingIndex];

        const updatedVaccine = {
          ...existingVaccine,
          vaccinationDate,
          expiryDate,
          history: [...(existingVaccine.history || []), newHistoryItem].sort(
            (a, b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate)
          ),
        };

        const updatedVaccines = [...prevVaccines];
        updatedVaccines[existingIndex] = updatedVaccine;
        return updatedVaccines;
      }

      const newVaccine = {
        id: `${Date.now()}`,
        name: name.trim(),
        vaccinationDate,
        expiryDate,
        history: [newHistoryItem],
      };

      return [newVaccine, ...prevVaccines];
    });
  };

  const value = useMemo(
    () => ({
      vaccines,
      isLoading,
      addVaccine,
    }),
    [vaccines, isLoading]
  );

  return <VaccinesContext.Provider value={value}>{children}</VaccinesContext.Provider>;
};

export const useVaccines = () => {
  const context = useContext(VaccinesContext);

  if (!context) {
    throw new Error('useVaccines должен использоваться внутри VaccinesProvider');
  }

  return context;
};