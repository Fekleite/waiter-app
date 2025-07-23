import {
  Modal,
  type ModalProps,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { CheckCircle } from '../assets/icons/check-circle';

import { Text } from './text';

interface ConfirmedOrderModalProps extends ModalProps {
  onFinish: () => void;
}

export function ConfirmedOrderModal({
  onFinish,
  ...props
}: ConfirmedOrderModalProps) {
  return (
    <Modal {...props} animationType="fade" statusBarTranslucent>
      <View style={styles.container}>
        <CheckCircle />

        <Text size={18} weight="600" color="#ffffff">
          Pedido confirmado
        </Text>
        <Text style={styles.subtitle} color="#ffffff">
          Acompanhe na home o status de produção
        </Text>

        <Pressable style={styles.button} onPress={onFinish}>
          <Text size={14} weight="600" color="#D73035">
            OK
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D73035',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  subtitle: {
    opacity: 0.9,
    textAlign: 'center',
    maxWidth: 196,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 48,
  },
});
