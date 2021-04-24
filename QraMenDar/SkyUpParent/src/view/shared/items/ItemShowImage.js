import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import UploadFile from "../../../modules/shared/upload//upload";
import PropTypes from "prop-types";
import platform from "native-base-theme/variables/platform";
import IconCAM from "assets/icons/popular/Camera.png";
import DefaultProfile from "assets/icons/popular/profile.png";

import { ViewPropTypes } from "react-native";

export default class ItemShowImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sourceGet: null,
    };
  }

  getPath = () => {
    var { source } = this.props;

    if (typeof source === "object" && source !== null) {
      UploadFile.getPath(source).then((data) => {
        this.setState({ sourceGet: data, loading: false });
      });
    } else if (source !== null) {
      this.setState({ sourceGet: { uri: source }, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };
  componentDidMount() {
    this.getPath();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.source !== this.props.source) {
      this.getPath();
    }
  }

  render() {
    var { style, placeholder, source, withIcon } = this.props;
    var { loading, sourceGet } = this.state;

    if (loading) {
      return (
        <View style={[style, { backgroundColor: "gray", opacity: 0.2 }]}></View>
      );
    }
    return (
      <View>
        <Image
          style={style}
          source={source ? sourceGet : placeholder ? placeholder : (withIcon?IconCAM:DefaultProfile)}
        />
        {withIcon && (
          <View
            style={{
              width: platform.normalize(22),
              height: platform.normalize(22),
              borderRadius: 100,
              backgroundColor: platform.brandInfo,
              position: "absolute",
              bottom: 2,
              right: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {withIcon}
          </View>
        )}
      </View>
    );
  }
}

ItemShowImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: ViewPropTypes.style,
};
