import { Alert, Button, Text, View } from "react-native";

export default function taskManagerScreen() {
    return (
        <View style={styles.screenContainer}>
            <Text style={St}> Task Manager </Text>
            <Button title='Add Task'
                    onPress = {() => Alert.alert("Task Added!")}
            />
        </View>
    )
}