import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import TaskScreen, { taskColors } from '@/components/TaskScreen';
import { useTasks, type Task } from '@/context/TasksContext';

export default function TaskEditor() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks } = useTasks();

  const task = tasks.find((item) => item.id === id);

  return (
    <TaskScreen title={id ? 'Edit Task' : 'New Task'} back>
      {id && !task ? (
        <Text style={styles.missing}>
          This task no longer exists. Go back to your task list.
        </Text>
      ) : (
        <TaskForm key={id ?? 'new'} task={task} />
      )}
    </TaskScreen>
  );
}

function TaskForm({ task }: { task?: Task }) {
  const { saveTask } = useTasks();

  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [dueTime, setDueTime] = useState(task?.dueTime ?? '');
  const [error, setError] = useState('');

  function confirmTask() {
    try {
      saveTask(
        {
          title,
          dueDate,
          dueTime,
        },
        task?.id
      );

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/tasks-manager');
      }
    } catch (problem) {
      setError(
        problem instanceof Error
          ? problem.message
          : 'The task could not be saved.'
      );
    }
  }

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={styles.formContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.calendar}>
        <SymbolView
          name={{
            ios: 'calendar',
            android: 'calendar_month',
            web: 'calendar_month',
          }}
          tintColor={taskColors.white}
          size={120}
          style={styles.calendarIcon}
        />
      </View>

      <Text style={styles.label}>Task name</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Name of the task"
        placeholderTextColor="#677980"
        accessibilityLabel="Task name"
        maxLength={120}
        autoCapitalize="sentences"
        style={styles.titleInput}
      />

      <View style={styles.dateTimeRow}>
        <View style={styles.field}>
          <Text style={styles.label}>Due date</Text>

          <TextInput
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#677980"
            accessibilityLabel="Due date, YYYY-MM-DD"
            maxLength={10}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.smallInput}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Time</Text>

          <TextInput
            value={dueTime}
            onChangeText={setDueTime}
            placeholder="HH:mm"
            placeholderTextColor="#677980"
            accessibilityLabel="Due time, 24-hour HH:mm"
            maxLength={5}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.smallInput}
          />
        </View>
      </View>

      <Text style={styles.hint}>
        Date and time are optional. Example: 2026-11-20 at 14:30.
      </Text>

      {error !== '' && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable
        onPress={confirmTask}
        disabled={!title.trim()}
        accessibilityRole="button"
        accessibilityState={{ disabled: !title.trim() }}
        style={({ pressed }) => [
          styles.confirmButton,
          !title.trim() && styles.disabledButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.confirmText}>
          {task ? 'Save changes' : 'Confirm'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 24,
  },
  calendar: {
    minHeight: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  calendarIcon: {
    width: 130,
    height: 130,
  },
  label: {
    color: taskColors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: taskColors.white,
    color: taskColors.text,
    borderRadius: 12,
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 17,
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    flex: 1,
    minWidth: 0,
  },
  smallInput: {
    backgroundColor: taskColors.white,
    color: taskColors.text,
    borderRadius: 12,
    minHeight: 56,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
  },
  hint: {
    color: taskColors.text,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  error: {
    color: '#651A12',
    backgroundColor: '#FFF0EA',
    padding: 12,
    borderRadius: 10,
    lineHeight: 20,
    marginTop: 18,
  },
  confirmButton: {
    backgroundColor: taskColors.yellow,
    minHeight: 58,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 34,
  },
  confirmText: {
    color: taskColors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.75,
  },
  missing: {
    color: taskColors.text,
    fontSize: 16,
    lineHeight: 24,
  },
});