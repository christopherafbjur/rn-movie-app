import React, { useState } from "react";
import { API_BASE_URL } from "@env";
import { SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import MovieList from "../components/movieList";

function SearchScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState([]);

  const handlePress = ({ title, id }) =>
    navigation.navigate("Movie", {
      id,
      title,
    });
  const clearSearch = () => {
    setLoading(false);
    setData([]);
    setSearchValue("");
  };
  const handleSearch = (value) => {
    const query = encodeURIComponent(value);

    if (value === "") return clearSearch();
    setLoading(true);
    fetch(`${API_BASE_URL}movies?title=${query}`)
      .then((response) => response.json())
      .then((data = []) => {
        if (!data.length) {
          setError("No movies available");
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
    setSearchValue(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        lightTheme
        inputStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "white" }}
        containerStyle={{ backgroundColor: "white" }}
        placeholder="Type Here..."
        onChangeText={handleSearch}
        value={searchValue}
      />
      <MovieList
        onPress={handlePress}
        loading={loading}
        error={error}
        data={data}
        search={searchValue}
      ></MovieList>
    </SafeAreaView>
  );
}

export default SearchScreen;
