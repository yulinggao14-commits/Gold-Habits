
// Used for storing info even when the app is terminated / exited (syncs everything)
import AsyncStorage from '@react-native-async-storage/async-storage';


// Importing packages 
import {
  createContext, // Getting the usr context which will then match the closest contex
  useContext, // Syncing everything after react creates a render and will clean up anything that is needed
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';


// Creating the types for the each stuct. 
export type Task = {
    // None of these store the actual value
  id: string; // id will be of type string which will enable the program ot distingush the different tasks crated
  title: string; // similar to id, but done for the title  val 
  dueDate: string; // same
  dueTime: string; // same
  completed: boolean; // used to determine if the user has completed a task or not will be used in creating a new task and toggling
};

//Creating new type and giving it the afermentioned title duedate and time
type TaskDraft = Pick<Task, 'title' | 'dueDate' | 'dueTime'>;

// Similar to the types craeted above but will be used for value sharing through context
type TasksContextValue = {

// Contains task objects
  tasks: Task[];

// Intializing bool values determining if something is being loaded saved or is ready
  loading: boolean; // Used for
  ready: boolean;
  saving: boolean;
  error: string | null;

  // Creating functions that will check if a task can be saved if it exsist and can be toggled, removed or restored if it will retry 
  saveTask: (draft: TaskDraft, id?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  restoreTask: (task: Task) => void;
  retry: () => void;
};

// Where array is being held
const STORAGE_KEY = 'goldhabits.task-manager.v1';

// Shared context with type allowing reg val or allow a val if one is missing
const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);


function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const task = value as Partial<Task>;

  return (
    typeof task.id === 'string' &&
    task.id.length > 0 &&
    typeof task.title === 'string' &&
    task.title.trim().length > 0 &&
    typeof task.dueDate === 'string' &&
    typeof task.dueTime === 'string' &&
    typeof task.completed === 'boolean'
  );
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [readAttempt, setReadAttempt] = useState(0);
  const [writeAttempt, setWriteAttempt] = useState(0);

  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  // Load saved tasks when the provider first opens.
  useEffect(() => {
    let active = true;

    async function loadTasks() {
      setLoading(true);

      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed: unknown = stored === null ? [] : JSON.parse(stored);

        if (!Array.isArray(parsed) || !parsed.every(isTask)) {
          throw new Error('Invalid saved task data');
        }

        const ids = new Set(parsed.map((task) => task.id));

        if (ids.size !== parsed.length) {
          throw new Error('Duplicate task IDs');
        }

        if (active) {
          setTasks(parsed);
          setError(null);
          setReady(true);
        }
      } catch {
        if (active) {
          setError('Your saved tasks could not be loaded. Please retry.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      active = false;
    };
  }, [readAttempt]);

  // Save after changes. Queue writes so older changes cannot finish last.
  useEffect(() => {
    if (!ready) {
      return;
    }

    let active = true;
    const data = JSON.stringify(tasks);

    setSaving(true);

    writeQueue.current = writeQueue.current
      .catch(() => undefined)
      .then(() => AsyncStorage.setItem(STORAGE_KEY, data));

    void writeQueue.current.then(
      () => {
        if (active) {
          setSaving(false);
          setError(null);
        }
      },
      () => {
        if (active) {
          setSaving(false);
          setError('Changes have not saved. Keep the app open and retry.');
        }
      }
    );

    return () => {
      active = false;
    };
  }, [tasks, ready, writeAttempt]);

  function saveTask(draft: TaskDraft, id?: string) {
    if (!ready) {
      throw new Error('Wait for your tasks to finish loading.');
    }

    const clean = {
      title: draft.title.trim(),
      dueDate: draft.dueDate.trim(),
      dueTime: draft.dueTime.trim(),
    };

    if (!clean.title) {
      throw new Error('Enter a task name.');
    }

    if (clean.title.length > 120) {
      throw new Error('Keep the task name to 120 characters or fewer.');
    }

    if (clean.dueDate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.dueDate)) {
        throw new Error('Enter the date as YYYY-MM-DD.');
      }

      const [year, month, day] = clean.dueDate.split('-').map(Number);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        throw new Error('Enter a real calendar date.');
      }
    }

    if (clean.dueTime) {
      if (!clean.dueDate) {
        throw new Error('Add a date before adding a time.');
      }

      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(clean.dueTime)) {
        throw new Error('Enter the time as HH:mm, for example 14:30.');
      }
    }

    if (id) {
      if (!tasks.some((task) => task.id === id)) {
        throw new Error('This task no longer exists.');
      }

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, ...clean } : task
        )
      );

      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      ...clean,
      completed: false,
    };

    setTasks((current) => [newTask, ...current]);
  }

  function toggleTask(id: string) {
    if (!ready) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function removeTask(id: string) {
    if (!ready) return;

    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function restoreTask(task: Task) {
    if (!ready) return;

    setTasks((current) =>
      current.some((item) => item.id === task.id)
        ? current
        : [task, ...current]
    );
  }

  function retry() {
    if (ready) {
      setWriteAttempt((current) => current + 1);
    } else {
      setReadAttempt((current) => current + 1);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        ready,
        saving,
        error,
        saveTask,
        toggleTask,
        removeTask,
        restoreTask,
        retry,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used inside TasksProvider.');
  }

  return context;
}