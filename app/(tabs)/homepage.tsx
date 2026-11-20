import { Href, router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
//Task manager checklist overlay
import { useTasks } from '@/context/TasksContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import { Text, View } from '@/components/Themed';

const { width, height } = Dimensions.get('window');

const handleContinue = (tabName: Href) => {
  router.push(tabName);
}

const DisplayStats = () => {
  const [currentLevel, setLevel] = useState(3);
  const [currentGold, setGold] = useState(81);

  // test code to show that it can update in real-time
  /* 
  const upLevel = () => setLevel(prevLevel => prevLevel + 1);
  const upGold = () => setGold(prevGold => prevGold + 1);
  // put in code to make the "increment thing" TouchableOpacities below work
  // also have to re-add the imports for everything
  */

  /*
  <TouchableOpacity style={styles.tempButton} onPress={upLevel}> 
    <Text>increment level</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tempButton} onPress={upGold}>
    <Text>increment gold</Text>
  </TouchableOpacity>
  // put either TouchableOpacity somewhere in the View
  */



  return (
    <View style={styles.header}>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>Level: {currentLevel}</Text>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>Gold: {currentGold}</Text>
      </View>

    </View>
  );
};


export default function HomePage() {
  const { tasks, toggleTask, removeTask } = useTasks();

  //filter for task manager
  const [filterMode, setFilterMode] = useState<'all' | 'incomplete'>('all');
  const visibleTasks = tasks.filter((t) =>
    filterMode == 'incomplete' ? !t.completed : true
  );

  return (

    // the icon.pngs are the size of the phone, so the icons have to be loaded like this to be visible
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/dressup_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/reward_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/background_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/shop_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/carp_default.png')}
        style={{ width: width, height: height }}
        resizeMode="contain"
      />

      <DisplayStats />
      <View style={styles.taskPanel}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskHeaderText}>
            Number of tasks left: {tasks.filter((t) => !t.completed).length}
          </Text>
          <View style={styles.taskHeaderIcons}>
            <TouchableOpacity style={styles.filterButton} onPress={() => { }}>
              <Ionicons name="options-outline" size={22} color="#1E3A5F" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => handleContinue('/task-editor')}>
              <Ionicons name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.taskList}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((task) => (
            <Pressable
              key={task.id}
              style={styles.taskCard}
              onLongPress={() => router.push('/tasks-manager')}
              onPress={() =>
                router.push({ pathname: '/task-editor', params: { id: task.id } })
              }
            >
              <View style={styles.taskLeft}>
                <MaterialCommunityIcons name="drag-vertical" size={22} color="#555" />
                <Text style={styles.taskTitle}>{task.title}</Text>
              </View>

              <View style={styles.taskRight}>
                <View style={styles.goldBadge}>
                  <Text style={styles.goldBadgeText}>+5</Text>
                </View>
                <TouchableOpacity
                  style={[styles.checkCircle, task.completed && styles.checkCircleDone]}
                  onPress={() => toggleTask(task.id)}
                >
                  {task.completed && <Ionicons name="checkmark" size={20} color="#4CAF50" />}
                </TouchableOpacity>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => handleContinue('/(tabs)/dressup')}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => handleContinue('/(tabs)/reward')}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => handleContinue('/(tabs)/background')}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => handleContinue('/(tabs)/Shop')}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#275DAD',
  },
  valueContainer: {
    justifyContent: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#2f95dc',
    borderRadius: 10,
    margin: 5,
  },
  valueText: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: width,
    height: height / 10,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  //I change the buttons pngs to align with the red border you made :)
  icon: {
    width: width,
    height: height * 1.09,
    position: "absolute",
    top: height / 17,
    left: -6,
  },
  button: {
    width: 50,
    height: 50,
    margin: 5,
    // temporary border for visibility
    // borderWidth: 3,
    borderRadius: 25,
    borderColor: "red",
  },
  /*
  small note: 
  the buttons aren't aligned with the icons for me (jaden le).
  it didn't look like a problem in yuling's video preview though (i didnt edit any values in this commit),
  so it likely has to do with absolute positioning vs different phone emulators' screen sizes
  (i'm using a 1080 x 2400 (px) resolution android 17 on expo go).
  shouldn't be an issue for the showcase assuming yuling uses the same device,
  but if the buttons are weird on your own device, that's why.
  */
  buttonBar: {
    flexDirection: 'column',
    width: 60,
    height: 280,
    position: 'absolute',
    right: 18,
    top: 104,
    backgroundColor: 'transparent',

  },

  //Task Manager UI: 
  taskPanel: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.34,
    backgroundColor: '#5BC0EB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
  },
  taskHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D253F',
  },
  taskHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  filterButton: {
    padding: 2,
  },
  addButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F4A261',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F3EB',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'transparent',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  taskRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent',
  },
  goldBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F4A261',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
  },
  checkCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E2E4E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleDone: {
    backgroundColor: '#D6F5D6',
  },

});
