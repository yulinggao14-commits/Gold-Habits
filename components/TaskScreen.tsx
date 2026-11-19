import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTasks } from '@/context/TasksContext';
const { width, height } = Dimensions.get('window');

export const taskColors = {
  blue: '#55BEE3',
  white: '#FFFFFF',
  yellow: '#FFC345',
  text: '#11232B',
};

type Props = {
  title: string;
  back?: boolean;
  children: ReactNode;
};

export default function TaskScreen({
  title,
  back = false,
  children,
}: Props) {
  const { loading, ready, saving, error, retry } = useTasks();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/tasks-manager');
    }
  }

  return (
    <View style={styles.screen}>
      <Image source={require("../assets/images/back_icon.png")}
        style={{
          position: 'absolute',
          width,
          height: height * 1.09,
          top: 5,
          left: -2,
        }}
        resizeMode="contain"
      />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {back && (
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}
            >

            </Pressable>
          )}

          <Text accessibilityRole="header" style={styles.heading}>
            {title}
          </Text>

          <View style={styles.divider} />

          {error && (
            <View style={styles.errorBox}>
              <Text accessibilityRole="alert" style={styles.errorText}>
                {error}
              </Text>

              <Pressable
                onPress={retry}
                accessibilityRole="button"
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          )}

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={taskColors.white} size="large" />
            </View>
          ) : ready ? (
            children
          ) : null}

          {ready && (
            <Text accessibilityLiveRegion="polite" style={styles.status}>
              {saving
                ? 'Saving…'
                : error
                  ? 'Changes not saved'
                  : 'Saved on this device'}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: taskColors.blue,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 22,
  },
  backButton: {
    width: 48,
    minHeight: 44,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 34,
    color: taskColors.text,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: taskColors.text,
    textAlign: 'center',
    marginVertical: 14,
  },
  divider: {
    height: 2,
    backgroundColor: taskColors.white,
    marginBottom: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorBox: {
    backgroundColor: '#FFF0EA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#7C2418',
    lineHeight: 20,
  },
  retryButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  retryText: {
    color: '#7C2418',
    fontWeight: '700',
  },
  status: {
    color: taskColors.text,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});