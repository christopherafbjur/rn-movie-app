import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

function MovieSection({ title, data, onPress }) {
  const keyExtractor = (item, index) => item.id;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.cardOuterContainer}
    >
      <Image
        style={styles.cardImage}
        source={{
          uri: item.poster,
        }}
      />
      <View style={styles.cardInnerContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.plot}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          horizontal
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default MovieSection;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    fontFamily: "AppleSDGothicNeo-SemiBold",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardOuterContainer: {
    position: "relative",
    width: 140,
    height: 200,
    backgroundColor: "gray",
    marginRight: 10,
  },
  cardImage: { width: "100%", height: "100%", position: "absolute" },
  cardInnerContainer: {
    padding: 10,
  },
  cardTitle: {
    fontFamily: "AppleSDGothicNeo-SemiBold",
    fontSize: 18,
    color: "white",
  },
  cardDescription: {
    color: "white",
  },
});
