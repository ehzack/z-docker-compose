import React, { Component } from "react";
import { Form, View, Button } from "native-base";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";
import FormErrors from "../../form/formErrors";
import { FastField } from "formik";
import DictioanryService from "../../../../modules/dictionary/dictionaryService";
import RNPickerSelect from "react-native-picker-select";
// import SkeletonContent from "react-native-skeleton-content";
import platform from "../../../../../native-base-theme/variables/platform";
import Modal from "react-native-modal";
import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import XIcon from "../../../../../assets/icons/popular/X.svg";
import SearchIcon from "../../../../../assets/icons/popular/Search.svg";

class SelectFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      loading: true,
      handleSearchData: [],
      ItemSelected: [],
    };
  }

  async componentDidMount() {
    let optionFinal = [];
    let option = await this.props.fetchFn("");

    optionFinal = option.map((item) => ({
      value: item.id,
      label: item.label,
    }));

    this.setState({ options: optionFinal, loading: false });
  }
  handleScroll = (event, size) => {
    let constSize =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;
    let y = event.nativeEvent.contentOffset.y;

    let purcentOfMaxScroll = (y / constSize) * 100;
    let item = Math.ceil(size * (purcentOfMaxScroll / 100));
    if (item >= size) {
      item = size - 1;
    }
    var { name, form } = this.props;

    form.setFieldValue(name, ItemSelected);

    this.setState({ itemSelected: item });

    this.flatList.scrollToItem({ item, animated: false });
  };
  handlePress = () => {
    let { options, form, name } = this.props;
    form.setFieldValue(name, options[this.state.itemSelected]);
    this.setState({ openModal: false });
  };

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  handleSearch = async (e) => {
    if (e != "") {
      let option = await this.props.fetchFn(e);

      let optionFinal = option.map((item) => ({
        value: item.id,
        label: item.label,
      }));

      this.setState({ handleSearchData: optionFinal });
    } else {
      this.setState({ handleSearchData: [] });
    }
  };

  AddItem = (item) => {
    var { name, form } = this.props;
    var { ItemSelected } = this.state;
    this.setState({ handleSearchData: [] });
    var newData = [...ItemSelected, item];
    this.setState((prevState) => ({
      ItemSelected: [...prevState.ItemSelected, item],
    }));

    form.setFieldValue(name, newData);
  };

  DeleteItem = (item) => {
    let { ItemSelected } = this.state;
    var { name, form } = this.props;

    ItemSelected = ItemSelected.filter(function (ele) {
      return ele.label != item.label;
    });
    this.setState({ handleSearchData: [], ItemSelected: ItemSelected });

    form.setFieldValue(name, ItemSelected);
  };

  ItemLoading = () => (
    <FlatList
      contentContainerStyle={{
        alignSelf: "flex-start",
        height: platform.deviceHeight * 0.4,
      }}
      numColumns={5}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={Array.from(Array(30).keys())}
      renderItem={({ item, index }) => (
        <View
          style={{
            height: platform.getRelativeHeight(35 + 13),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <SkeletonContent
            containerStyle={{ flex: 1, width: "100%" }}
            isLoading={this.state.loading}
            layout={[
              {
                key: "someId",
                width: platform.getRelativeWidth(98),
                height: platform.getRelativeHeight(35),
                borderRadius: 25,
                marginRight: platform.getRelativeWidth(17),
                marginLeft:
                  index % 5 == 0 && (index / 5) % 2 != 0
                    ? platform.getRelativeWidth(17)
                    : 0,
              },
            ]}
          ></SkeletonContent> */}
        </View>
      )}
    />
  );
  ItemRender = (item, index) => (
    <View
      key={item}
      style={{
        height: platform.getRelativeHeight(35 + 13),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={[
          {
            minWidth: platform.getRelativeWidth(98),

            height: platform.getResponsiveHeight(4),
            borderRadius: 25,
            marginRight: platform.getRelativeWidth(17),
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: platform.getResponsiveWidth(2),
            paddingRight: platform.getResponsiveWidth(2),

            marginLeft:
              index % 5 == 0 && (index / 5) % 2 != 0
                ? platform.getRelativeWidth(17)
                : 0,
          },
          this.state.ItemSelected.some((select) => select.label === item.label)
            ? { backgroundColor: platform.brandPrimary }
            : { backgroundColor: "white" },
        ]}
        onPress={() =>
          !this.state.ItemSelected.some((select) => select.label === item.label)
            ? this.AddItem(item)
            : null
        }
      >
        <Text
          style={{
            fontFamily: "Calibri",
            fontSize: platform.getRelativeWidth(18),
            color: this.state.ItemSelected.some(
              (select) => select.label === item.label
            )
              ? "white"
              : "black",
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
  RenderAutocompletSearch = (data) => {
    let { ItemSelected } = this.state;
    return (
      <View
        style={{
          position: "absolute",
          top: platform.getRelativeHeight(58),
          width: "100%",
          height:
            (data.length > 4 ? 4 : data.length) *
            platform.getRelativeHeight(50),
          backgroundColor: "white",
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          zIndex: 99999,
        }}
      >
        <ScrollView style={{ flexGrow: 0, backgroundColor: "white" }}>
          {data.map((item) => (
            <TouchableOpacity
              onPress={() => {
                !ItemSelected.some((select) => select.label === item.label)
                  ? this.AddItem(item)
                  : null;
              }}
              style={[
                {
                  height: platform.getRelativeHeight(50),
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                  borderColor: "rgba(158, 150, 150, 0.5)",
                },
                ItemSelected.some((select) => select.label === item.label)
                  ? { backgroundColor: platform.brandPrimary }
                  : null,
              ]}
            >
              <Text style={{ textAlign: "center" }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  randerItemSelected = () => {
    let { ItemSelected } = this.state;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignSelf: "flex-start",
        }}
        horizontal={true}
        data={ItemSelected}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.DeleteItem(item)}
            style={{
              minWidth: platform.getRelativeWidth(98),

              paddingTop: platform.getRelativeWidth(5),
              paddingBottom: platform.getRelativeWidth(5),

              paddingLeft: platform.getResponsiveWidth(2),
              paddingRight: platform.getResponsiveWidth(2),
              borderRadius: 25,
              backgroundColor: platform.brandPrimary,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginRight: platform.getRelativeWidth(8),
            }}
          >
            <XIcon
              style={{
                position: "absolute",
                right: platform.getRelativeWidth(7),
                top: platform.getRelativeHeight(5),
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: platform.getRelativeWidth(18),
                fontFamily: "Calibri",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
      placeholder,
      mode,
      autoFocus,
      autoComplete,
      prefix,
      formItemProps,
      inputProps,
      errorMessage,
      required,
      info,
      style,
      value,
    } = this.props;
    var { options, handleSearchData, ItemSelected } = this.state;

    return (
      <Form style={style}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingLeft: platform.getRelativeWidth(32),
            paddingRight: platform.getRelativeWidth(32),
          }}
        >
          <View
            style={{
              height: platform.getRelativeHeight(58),
              width: "100%",

              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "white",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomLeftRadius: handleSearchData.length > 0 ? 0 : 25,
              borderBottomRightRadius: handleSearchData.length > 0 ? 0 : 25,
              shadowOffset: {
                width: 50,
                height: 50,
              },
              shadowOpacity: 1,
              shadowRadius: 1,

              elevation: 4,
            }}
          >
            <SearchIcon
              style={{
                position: "absolute",
                left: platform.getRelativeWidth(17),
              }}
            />
            <TextInput
              onChangeText={this.handleSearch}
              style={[{ color: "#2C2929" }]}
              placeholder={label}
            />
          </View>

          {handleSearchData.length > 0 &&
            this.RenderAutocompletSearch(handleSearchData)}
        </View>

        <View
          style={{
            width: "100%",
            height: platform.getResponsiveHeight(10),
            paddingBottom: platform.getResponsiveHeight(3),
            paddingTop: platform.getResponsiveHeight(3),
          }}
        >
          {this.randerItemSelected()}
        </View>
        <ScrollView
          horizontal={true}
          style={{
            width: platform.deviceWidth,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {this.state.loading ? (
            this.ItemLoading()
          ) : (
            <FlatList
              contentContainerStyle={{
                alignSelf: "flex-start",
                height: platform.deviceHeight * 0.45,
              }}
              numColumns={5}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={options}
              renderItem={({ item, index }) => this.ItemRender(item, index)}
            />
          )}
        </ScrollView>
      </Form>
    );
  }
}

SelectFormItemNotFast.defaultProps = {
  required: false,
};

SelectFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
  mode: PropTypes.string,
};

class AutoCompleteList extends Component {
  render() {
    let { name } = this.props;

    return (
      <FastField name={name}>
        {({ form }) => <SelectFormItemNotFast {...this.props} form={form} />}
      </FastField>
    );
  }
  // return this.state.option == null ? (

  // ) : (
  //
  // );
}

export default AutoCompleteList;
