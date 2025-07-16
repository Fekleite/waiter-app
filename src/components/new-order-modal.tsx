import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  type ModalProps,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { Close } from '../assets/icons/close';
import { isIOS } from '../utils/platform';

import { Button } from './button';
import { Text } from './text';

interface NewOrderModalProps extends ModalProps {
  onSave: (tableNumber: string) => void;
  onClose: () => void;
}

export function NewOrderModal({
  onSave,
  onClose,
  ...props
}: NewOrderModalProps) {
  const [tableNumber, setTableNumber] = useState('');

  function handleInputChange(value: string) {
    setTableNumber(value);
  }

  function handleSave() {
    onSave(tableNumber);
    setTableNumber('');
    onClose();
  }

  return (
    <Modal {...props} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={isIOS ? 'padding' : 'height'}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text weight="600">Informar a mesa</Text>

            <Pressable
              style={({ pressed }) => [pressed ? styles.closeButton : {}]}
              onPress={onClose}
            >
              <Close color="#666666" />
            </Pressable>
          </View>

          <View style={styles.modalForm}>
            <TextInput
              style={styles.input}
              placeholder="Número da mesa"
              placeholderTextColor="#999999"
              keyboardType="number-pad"
              onChangeText={handleInputChange}
            />

            <Button onPress={handleSave} disabled={tableNumber.length === 0}>
              Salvar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#fafafa',
    padding: 24,
    borderRadius: 8,
    gap: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalForm: {
    gap: 24,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
});
