import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function AddTodoScreen({ navigation }) {
  const [text, setText] = useState('');

  const handleAddTodo = async () => {
    const newTodo = {
      id: new Date().getTime(),
      text: text
    };

    // Store in SecureStore
    let storedTodos = await SecureStore.getItemAsync('todos');
    let todos = storedTodos ? JSON.parse(storedTodos) : [];
    todos.push(newTodo);
    await SecureStore.setItemAsync('todos', JSON.stringify(todos));

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput value={text} onChangeText={setText} placeholder="Task Name" />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
}
