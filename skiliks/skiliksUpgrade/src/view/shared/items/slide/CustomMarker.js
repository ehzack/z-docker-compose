import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import platform from '../../../../../native-base-theme/variables/platform';
import { LinearGradient } from 'expo-linear-gradient';
import CheckSVG from 'assets/icons/popular/check.svg';
class CustomMarker extends React.Component {
  render() {
    var { value } = this.props;
    return (
      <View style={{}}>
        <LinearGradient
          colors={[platform.brandPrimary, 'white']}
          start={[0.8, 0]}
          end={[0, 0]}
          style={{
            width: platform.normalize(32),
            height: platform.normalize(32),
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 100,
            backgroundColor: platform.brandPrimary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckSVG
            width={platform.circleSize(35)}
            height={platform.circleSize(35)}
          />
        </LinearGradient>
        <Text
          style={{
            textAlign: 'center',
            color: '#999999',
            fontFamily: 'Calibri',
            fontSize: platform.normalize(12),
          }}
        >
          {value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});

export default CustomMarker;
