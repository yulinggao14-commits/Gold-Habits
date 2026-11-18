import { Alert, Button, Text, View } from "react-native";

export default function taskManagerScreen() {
    return (
        <View>
            <Text> Task Manager </Text>
            <Button title='Add Task'
                    onPress = {() => Alert.alert("Task Added!")}
            />
        </View>
    );
}