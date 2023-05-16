import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRatingComponent = ({rating, setRating}) => {
  const handleRating = value => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          style={styles.starContainer}>
          <Icon
            name={rating >= i ? 'star' : 'star-outline'}
            size={32}
            color={rating >= i ? '#FFD700' : '#A9A9A9'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starContainer: {
    padding: 5,
  },
});

export default StarRatingComponent;
