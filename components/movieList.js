import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

export default ({ onPress, loading, error, data, search }) => {
  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.poster }} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.plot}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  if (error) return <Text>ERROR: {error}</Text>;
  if (search && !data.length)
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}
        >{`Could't find anything for "${search}"`}</Text>
      </View>
    );
  if (!data.length)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Try searching for something...</Text>
      </View>
    );
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 70 }}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    padding: 10,
    textAlign: "center",
  },
});
