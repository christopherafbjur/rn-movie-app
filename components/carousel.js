import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Tile } from "react-native-elements";

export default function CarouselComponent({ data, onPress }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width: viewportWidth } = Dimensions.get("window");
  let _carousel = React.createRef(null);

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Tile
          imageSrc={{
            uri: item.poster,
          }}
          activeOpacity={1}
          title={item.title}
          featured
          caption={item.writer}
          onPress={() => onPress(item)}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        autoplay={true}
        loop={true}
        layout={"default"}
        data={data}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
