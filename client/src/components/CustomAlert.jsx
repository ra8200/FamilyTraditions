import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const CustomAlert = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        <Text style={styles.message}>{message}</Text>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default CustomAlert;
