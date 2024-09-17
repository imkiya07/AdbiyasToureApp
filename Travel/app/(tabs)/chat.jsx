// App.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ChatPage = () => {
  return (
    <LinearGradient colors={['#3b82f6', '#e0e7ff']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FontAwesome5 name="user-circle" size={40} color="white" style={styles.profileIcon} />
          <View>
            <Text style={styles.headerText}>Ibrahim</Text>
            <Text style={styles.statusText}>[Support is online]</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome5 name="phone" size={20} color="black" style={styles.headerIcon} />
          <FontAwesome5 name="video" size={20} color="black" style={styles.headerIcon} />
          <FontAwesome name="ellipsis-h" size={20} color="black" style={styles.headerIcon} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.botMessageContainer}>
          <View style={styles.botProfileIconContainer}>
            <FontAwesome5 name="robot" size={20} color="white" />
          </View>
          <View style={styles.botMessage}>
            <Text>Hello! How can I help you?</Text>
          </View>
        </View>
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text>Assalamualaikum!</Text>
          </View>
          <View style={styles.userProfileIconContainer}>
            <FontAwesome5 name="user" size={20} color="white" />
          </View>
        </View>
        <View style={styles.botMessageContainer}>
          <View style={styles.botProfileIconContainer}>
            <FontAwesome5 name="robot" size={20} color="white" />
          </View>
          <View style={styles.botMessage}>
            <Text>Olikumsalam! Please give your personal info</Text>
          </View>
        </View>
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text>Okay Can I give you ...</Text>
          </View>
          <View style={styles.userProfileIconContainer}>
            <FontAwesome5 name="user" size={20} color="white" />
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Compose Your Message ..." />
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#3b82f6',
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  botProfileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  botMessage: {
    backgroundColor: '#D1D5DB',
    borderRadius: 15,
    padding: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  userProfileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    borderRadius: 15,
    padding: 10,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatPage;
