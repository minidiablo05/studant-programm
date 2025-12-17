import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  Modal,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

const TaskManager = () => {
  // Состояния
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  // Добавление новой задачи
  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
      setInputText('');
      Keyboard.dismiss();
    }
  };

  // Переключение статуса выполнения
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Удаление задачи
  const deleteTask = (id) => {
    Alert.alert(
      "Удалить задачу",
      "Вы уверены, что хотите удалить эту задачу?",
      [
        { text: "Отмена", style: "cancel" },
        { 
          text: "Удалить", 
          style: "destructive",
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        }
      ]
    );
  };

  // Редактирование задачи
  const editTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: newText.trim() } : task
      ));
      setEditingTask(null);
      setEditText('');
    }
  };

  // Фильтрация задач
  const getFilteredTasks = () => {
    let filteredTasks = tasks;
    
    // Применяем фильтр
    if (filter === 'active') {
      filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Применяем поиск
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.text.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredTasks;
  };

  // Статистика задач
  const getTasksStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  };

  // Очистка выполненных задач
  const clearCompleted = () => {
    Alert.alert(
      "Очистить выполненные",
      "Удалить все выполненные задачи?",
      [
        { text: "Отмена", style: "cancel" },
        { 
          text: "Очистить", 
          style: "destructive",
          onPress: () => setTasks(tasks.filter(task => !task.completed))
        }
      ]
    );
  };

  // Открытие модального окна для редактирования
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditText(task.text);
  };

  // Статистика
  const stats = getTasksStats();

  // Отфильтрованные задачи
  const filteredTasks = getFilteredTasks();

  // Рендер одной задачи
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        onPress={() => toggleTask(item.id)}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Text >✓</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text style={[styles.taskText]}>
          {item.text}
        </Text>
        <Text style={styles.taskDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      
      <View style={styles.taskActions}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Верхняя панель */}
      <View style={styles.header}>
        <Text style={styles.title}>Менеджер задач</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Всего</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.active}</Text>
            <Text style={styles.statLabel}>Активные</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Выполнено</Text>
          </View>
        </View>
      </View>

      {/* Поле поиска */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск задач..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
        {searchText.length > 0 && (
          <TouchableOpacity 
            style={styles.clearSearchButton}
            onPress={() => setSearchText('')}
          >
            <Text style={styles.statLabel}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Поле ввода новой задачи */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Введите новую задачу..."
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor="#999"
          onSubmitEditing={() => addTask(inputText)}
        />
        <TouchableOpacity 
          style={[styles.addButton, !inputText.trim() && styles.addButtonDisabled]}
          onPress={() => addTask(inputText)}
          disabled={!inputText.trim()}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Панель фильтров */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              Все ({tasks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
            onPress={() => setFilter('active')}
          >
            <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
              Активные ({stats.active})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Выполненные ({stats.completed})
            </Text>
          </TouchableOpacity>
          {stats.completed > 0 && (
            <TouchableOpacity 
              style={styles.clearCompletedButton}
              onPress={clearCompleted}
            >
              <Text style={styles.clearCompletedText}>
                Очистить выполненные
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Список задач */}
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={item => item.id}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {searchText ? 'Задачи не найдены' : 'Нет задач'}
          </Text>
          <Text style={styles.emptyStateSubtext}>
            {!searchText && 'Добавьте первую задачу!'}
          </Text>
        </View>
      )}

      {/* Модальное окно редактирования */}
      <Modal
        visible={!!editingTask}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditingTask(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Редактировать задачу</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              placeholder="Введите текст задачи"
              autoFocus={true}
              multiline={true}
              numberOfLines={3}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditingTask(null);
                  setEditText('');
                }}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => editTask(editingTask.id, editText)}
                disabled={!editText.trim()}
              >
                <Text style={styles.saveButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  clearSearchButton: {
    padding: 5,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 2,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  clearCompletedButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ff5252',
    borderRadius: 20,
    marginRight: 10,
  },
  clearCompletedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  taskActions: {
    flexDirection: 'row',
  },
  button: {
    padding: 5,
    marginRight: 5,
  },
  editButtonText: {
    fontSize: 18,
  }, 
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskManager;