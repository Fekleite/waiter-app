import {
  FlatList,
  ImageBackground,
  Modal,
  type ModalProps,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Close } from '../assets/icons/close';

import { defaultImageHost } from '../env';
import type { Product } from '../types/product';
import { formatToCurrency } from '../utils/number-format';

import { Button } from './button';
import { Container } from './container';
import { Text } from './text';
import { TextCard } from './text-card';

interface ProductDetailsModalProps extends ModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  ...props
}: ProductDetailsModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal {...props} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <ImageBackground
          source={{
            uri: `${defaultImageHost}/${product.imagePath}`,
          }}
          style={styles.image}
        >
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed ? { opacity: 0.5 } : {},
            ]}
            onPress={onClose}
          >
            <Close color="#ffffff" />
          </Pressable>
        </ImageBackground>

        <View style={styles.modalContent}>
          <View style={styles.title}>
            <Text weight="600" size={18}>
              {product.name}
            </Text>
            <Text color="#666666">{product.description}</Text>
          </View>

          {product.ingredients.length > 0 && (
            <View style={styles.ingredientsList}>
              <Text weight="600" color="#666666">
                Ingredientes
              </Text>

              <FlatList
                data={product.ingredients}
                keyExtractor={(ingredient) => ingredient._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TextCard
                    label={item.name}
                    icon={item.icon}
                    style={{ marginBottom: 4 }}
                  />
                )}
              />
            </View>
          )}
        </View>

        <Container style={styles.footerContainer}>
          <View style={styles.modalFooter}>
            <View>
              <Text color="#666666">Preço</Text>

              <Text weight="600" size={18}>
                {formatToCurrency(product.price)}
              </Text>
            </View>

            <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
          </View>
        </Container>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  closeButton: {
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 24,
    right: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  modalContent: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    gap: 32,
  },
  title: {
    gap: 16,
  },
  ingredientsList: {
    flex: 1,
    gap: 16,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  footerContainer: {
    backgroundColor: '#ffffff',
  },
  modalFooter: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
