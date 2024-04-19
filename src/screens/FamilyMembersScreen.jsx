import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const AddMemberModal = ({ isVisible, onClose, onAddMember }) => {
  const [memberEmail, setMemberEmail] = useState('');

  const handleAdd = () => {
    if (memberEmail.trim()) { 
      onAddMember(memberEmail);
      setMemberEmail(''); 
      onClose();
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a Family Member</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMemberEmail}
            value={memberEmail}
            placeholder="Enter member's email"
          />
          <Button title="Add Member" onPress={handleAdd} />
        </View>
      </View>
    </Modal>
  );
};

const FamilyMembersScreen = () => {
  const [members, setMembers] = useState([
    { id: '1', name: 'John Doe', role: 'Editor' },
    { id: '2', name: 'Jane Smith', role: 'Viewer' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddMember = (email) => {
    const newMember = {
      id: String(members.length + 1), 
      name: email, 
      role: 'Viewer' 
    };
    setMembers([...members, newMember]); 
    setModalVisible(false); 
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberRole}>{item.role}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>
      <AddMemberModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddMember={handleAddMember}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  memberName: {
    fontSize: 18,
  },
  memberRole: {
    fontSize: 16,
    color: '#666666',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});

export default FamilyMembersScreen;
