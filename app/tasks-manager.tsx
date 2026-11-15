import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TaskScreen, { taskColors } from '@/components/TaskScreen';
import { useTasks, type Task } from '@/context/TasksContext';

export default function TasksManager() {
  const { tasks, toggleTask, removeTask, restoreTask } = useTasks();
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);

  const remaining = tasks.filter((task) => !task.completed).length;

  function editTask(id: string) {
    router.push({
      pathname: '/task-editor',
      params: { id },
    });
  }

  function deleteTask(task: Task) {
    setDeletedTask(task);
    removeTask(task.id);
  }

  function undoDelete() {
    if (!deletedTask) return;

    restoreTask(deletedTask);
    setDeletedTask(null);
  }

  return (
    <TaskScreen title="Tasks Manager" back={router.canGoBack()}>
      <View style={styles.container}>
        <Text style={styles.counter}>
          Number of tasks left: {remaining}
        </Text>

        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={(task) => task.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No tasks yet. Tap + to add your first task.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Pressable
                style={styles.taskDetails}
                onPress={() => editTask(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Edit ${item.title}`}
              >
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completedTitle,
                  ]}
                >
                  {item.title}
                </Text>

                {item.dueDate !== '' && (
                  <Text style={styles.dueText}>
                    {item.dueDate}
                    {item.dueTime ? ` · ${item.dueTime}` : ''}
                  </Text>
                )}
              </Pressable>

              <Pressable
                onPress={() => toggleTask(item.id)}
                accessibilityRole="checkbox"
                accessibilityLabel={`Complete ${item.title}`}
                accessibilityState={{ checked: item.completed }}
                style={styles.iconButton}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.completed && styles.checked,
                  ]}
                >
                  {item.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </Pressable>

              <Pressable
                onPress={() => editTask(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Edit ${item.title}`}
                style={styles.iconButton}
              >
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>

              <Pressable
                onPress={() => deleteTask(item)}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.title}`}
                style={styles.iconButton}
              >
                <Text style={styles.deleteIcon}>×</Text>
              </Pressable>
            </View>
          )}
          ListFooterComponent={
            <Pressable
              onPress={() => router.push('/task-editor')}
              accessibilityRole="button"
              accessibilityLabel="Add a task"
              style={styles.addButton}
            >
              <Text style={styles.plus}>+</Text>
            </Pressable>
          }
        />

        {deletedTask && (
          <View style={styles.undoBar}>
            <Text style={styles.undoMessage}>Task deleted</Text>

            <Pressable
              onPress={undoDelete}
              accessibilityRole="button"
              style={styles.undoButton}
            >
              <Text style={styles.undoText}>Undo</Text>
            </Pressable>
          </View>
        )}
      </View>
    </TaskScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    fontSize: 15,
    fontWeight: '600',
    color: taskColors.text,
    marginBottom: 18,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: taskColors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    minHeight: 78,
  },
  taskDetails: {
    flex: 1,
    minWidth: 0,
    padding: 6,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: taskColors.text,
  },
  completedTitle: {
    color: '#6F7F83',
    textDecorationLine: 'line-through',
  },
  dueText: {
    fontSize: 12,
    color: '#53666B',
    marginTop: 6,
  },
  iconButton: {
    width: 44,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#B8DFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#E1F2CF',
    borderColor: '#84B953',
  },
  checkmark: {
    color: '#538C20',
    fontSize: 23,
    fontWeight: '700',
  },
  editIcon: {
    color: taskColors.text,
    fontSize: 26,
  },
  deleteIcon: {
    color: '#A34036',
    fontSize: 28,
  },
  addButton: {
    backgroundColor: taskColors.white,
    borderRadius: 12,
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#F3A12B',
    fontSize: 44,
    fontWeight: '700',
  },
  empty: {
    color: taskColors.text,
    textAlign: 'center',
    lineHeight: 23,
    paddingVertical: 30,
  },
  undoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#183A4A',
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 12,
  },
  undoMessage: {
    flex: 1,
    color: taskColors.white,
  },
  undoButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  undoText: {
    color: taskColors.yellow,
    fontWeight: '700',
  },
});