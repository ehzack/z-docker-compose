import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Picker,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import Country from "./country";
import styles from "./styles";
import Flags from "./resources/flags";
import platform from "../../../../../native-base-theme/variables/platform";

const PickerItem = Picker.Item;

const propTypes = {
  buttonColor: PropTypes.string,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  onPressCancel: PropTypes.func,
  onPressConfirm: PropTypes.func,
};

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || "#007AFF",
      modalVisible: false,
      selectedCountry: this.props.selectedCountry || Country.getAll()[0],
      data: [],
      offset: 0,
      page: 35,
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount() {
    this.setState({ data: Country.getAll() });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCountry: nextProps.selectedCountry,
    });
  }

  selectCountry(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  onPressCancel() {
    if (this.props.onPressCancel) {
      this.props.onPressCancel();
    }

    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit(selectedCountry) {
    if (this.props.onPressConfirm) {
      this.props.onPressConfirm();
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(selectedCountry);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  renderItem(country, index) {
    return (
      <PickerItem
        key={country.iso2}
        value={country.iso2}
        label={country.name}
      />
    );
  }

  loadMoreData = () => {
    let { offset } = this.state;
    this.setState({
      data: Country.getAll().slice(
        offset * this.state.page,
        this.state.page * (offset + 1)
      ),
    });
    this.setState({ offset: offset + 1 });
  };

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        isVisible={this.state.modalVisible}
        deviceWidth={platform.deviceWidth}
        deviceHeight={platform.deviceHeight}
        onBackdropPress={(e) => this.onPressCancel()}
        style={{}}
      >
        <View style={styles.basicContainer}>
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
            // onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  this.onPressSubmit(item.iso2);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: platform.getRelativeWidth(12),
                    fontFamily: "Poppins",
                  }}
                >
                  {item.name}
                </Text>
                <Image
                  source={Flags.get(item.iso2)}
                  style={{
                    width: platform.getRelativeWidth(30),
                    height: platform.getRelativeWidth(30),
                  }}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View
            style={{
              width: "100%",
              height: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.onPressCancel()}
              style={{
                backgroundColor: "white",
                height: "100%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: platform.getRelativeWidth(12),
                  fontFamily: "Poppins",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

CountryPicker.propTypes = propTypes;
