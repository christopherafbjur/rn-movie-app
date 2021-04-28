import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@env";
import { ActivityIndicator, View, Text } from "react-native";
import { Tile } from "react-native-elements";

function MovieScreen({ route }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const { id } = route.params;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data !== "object") {
          setError("No movie available");
          return setLoading(false);
        }

        setLoading(false);
        setData(data);

        if (error) setError(null);
      })
      .catch((e) => {
        setLoading(false);
        setError("Fetching movies failed");
      });
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  if (error) return <Text>ERROR: {error}</Text>;

  const { title, writer, poster, plot } = data;
  return (
    <View>
      <Tile
        imageSrc={{
          uri: poster,
        }}
        title={title}
        featured
        caption={writer}
      />
      <View
        style={{
          flexDirection: "row",
          padding: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>{plot}</Text>
        </View>
      </View>
    </View>
  );
}

export default MovieScreen;
