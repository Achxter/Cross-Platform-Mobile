import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5',
    display: 'flex',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 999,
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    width: 'fit-content',
    display: 'flex',
    gap: 2,
  },
});

export default styles;