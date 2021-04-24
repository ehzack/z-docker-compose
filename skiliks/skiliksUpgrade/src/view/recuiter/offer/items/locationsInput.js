import React, { Component } from 'react';
import { Form, Item, Container, Content, Button } from 'native-base';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import DictioanryService from 'src/modules/dictionary/dictionaryService';
// import SkeletonContent from "react-native-skeleton-content";
import platform from '../../../../../native-base-theme/variables/platform';
import Modal from 'react-native-modal';
import services from 'src/modules/dictionary/dictionaryService';
import ListItemRate from 'src/view/shared/list/listItemRate';
import HandSVG from 'assets/3DElements/pencil.svg';

import Animated, {
  cond,
  eq,
  event,
  Value,
  add,
  set,
  call,
  lessThan,
  greaterThan,
} from 'react-native-reanimated';
import Autocomplete from 'src/view/shared/items/Autocomplete';
class SelectFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      ItemSelected: [],
      options: [],
      loading: true,
    };
  }
  componentDidMount = () => {
    var { value } = this.props;
    this.setState({ ItemSelected: Array.isArray(value) ? value : [] });
  };
  handlePress = () => {
    let { options, form, name, onChange } = this.props;

    form.setFieldValue(name, this.state.ItemSelected);
    this.setState({ openModal: false });
  };

  ItemRender = (item, index) => (
    <View
      key={index}
      style={{
        height: platform.getRelativeHeight(35 + 13),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ItemSelected
    >
      <TouchableOpacity
        style={[
          {
            minWidth: platform.getRelativeWidth(98),

            height: platform.getResponsiveHeight(4),
            borderRadius: 25,
            marginRight: platform.getRelativeWidth(17),
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: platform.getResponsiveWidth(2),
            paddingRight: platform.getResponsiveWidth(2),
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            elevation: 2,
            shadowOpacity: 0.8,

            marginLeft:
              index % 5 == 0 && (index / 5) % 2 != 0
                ? platform.getRelativeWidth(17)
                : 0,
          },
          this.state.ItemSelected.some((select) => select.id === item.id)
            ? { backgroundColor: platform.brandPrimary }
            : { backgroundColor: 'white' },
        ]}
        onPress={() =>
          !this.state.ItemSelected.some((select) => select.id === item.id)
            ? this.AddItem(item)
            : this.DeleteItem(item)
        }
      >
        <Text
          style={{
            fontFamily: 'Calibri',
            fontSize: platform.getRelativeWidth(18),
            color: this.state.ItemSelected.some(
              (select) => select.id === item.id,
            )
              ? 'white'
              : 'black',
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  DeleteItem = (item) => {
    let { ItemSelected } = this.state;

    ItemSelected = ItemSelected.filter(function (ele) {
      return ele.id != item.id;
    });

    this.setState({ ItemSelected: ItemSelected });
  };

  AddItem = (item) => {
    var { name, form } = this.props;
    this.setState((prevState) => ({
      ItemSelected: [...prevState.ItemSelected, item],
    }));
  };

  Fetchfn = async (value) => {
    return services.listAutocompleteGeo(value);
  };

  HandleAddLocalization = async (item) => {
    var { dispatch } = this.props;
    var localizations = this.state.ItemSelected;
    let index = localizations.findIndex(
      (element) => element.label === item.label,
    );

    if (index == -1) {
      var data = await services.SaveGeo(item.label);
      localizations.push(data);
      this.setState({ localizations: localizations });
    }
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
      scroll,
      error,
    } = this.props;
    var { options, loading } = this.state;
    return (
      <View
        style={{
          width: '100%',
          paddingTop: scroll ? platform.getResponsiveHeight(2) : 0,
          paddingBottom: scroll ? platform.getResponsiveHeight(2) : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => this.setState({ openModal: true })}
          style={[
            {
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              shadowColor: 'rgb(78, 79, 114)',
              paddingLeft: platform.getRelativeWidth(35),
              paddingRight: platform.getRelativeWidth(35),
              height: platform.getResponsiveHeight(7),
              borderWidth: error ? 1 : 0,
              borderColor: '#F57969',

              backgroundColor: 'white',
              borderRadius: 25,
              zIndex: 0,
            },
            Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              },
              android: {
                shadowColor: 'rgb(78, 79, 114)',
                shadowOffset: {
                  width: 50,
                  height: 50,
                },
                shadowOpacity: 1,
                shadowRadius: 1,

                elevation: 2,
              },
            }),
          ]}
        >
          {Array.isArray(value) && value.length > 0 ? (
            <FlatList
              data={value}
              horizontal={true}
              renderItem={(e) => {
                return (
                  <View
                    style={{
                      borderRadius: 8,
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: platform.normalize(5),
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#DACCFF',
                        borderRadius: 5,
                        height: '60%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: platform.getResponsiveWidth(10),
                        padding: platform.normalize(5),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Calibri',
                          fontSize: platform.normalize(12),
                        }}
                      >
                        {e.item.label}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: platform.normalize(15),
                opacity: 0.4,
                borderColor: '#F57969',
              }}
            >
              {label}
            </Text>
          )}

          <Image
            style={{
              position: 'absolute',
              right: platform.getRelativeWidth(17),
            }}
            source={require('assets/icons/navigation/arrow-botom.png')}
          />
          <Modal
            isVisible={this.state.openModal}
            deviceWidth={platform.deviceWidth}
            deviceHeight={platform.deviceHeight}
            onBackdropPress={(e) => this.setState({ openModal: false })}
            style={{
              justifyContent: 'flex-end',
              margin: 0,
            }}
            backdropOpacity={0.5}
            backdropColor={'black'}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '55%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            >
              <View
                style={{
                  paddingLeft: platform.getResponsiveWidth(5),
                  paddingRight: platform.getResponsiveWidth(5),
                  position: 'absolute',
                  width: platform.getResponsiveWidth(100),
                  alignItems: 'center',
                  top: -platform.getResponsiveHeight(5),
                }}
              >
                <HandSVG
                  width={platform.normalize(70)}
                  height={platform.normalize(70)}
                  style={{}}
                />
              </View>
              <Content
                contentContainerStyle={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: platform.getRelativeHeight(58),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    paddingLeft: platform.getResponsiveWidth(8),
                    paddingRight: platform.getResponsiveWidth(8),
                  }}
                >
                  <Button
                    transparent
                    onPress={() => this.setState({ openModal: false })}
                  >
                    <Text
                      style={{
                        color: '#999999',
                        fontSize: platform.normalize(16),

                        fontFamily: 'Calibri',
                      }}
                    >
                      Cancel
                    </Text>
                  </Button>

                  <Button transparent onPress={(e) => this.handlePress()}>
                    <Text
                      style={{
                        fontSize: platform.normalize(16),
                        fontWeight: 'bold',

                        fontFamily: 'Calibri',
                        color: platform.brandPrimary,
                      }}
                    >
                      Confirm
                    </Text>
                  </Button>
                </View>

                <View
                  style={{
                    width: '100%',
                    paddingLeft: platform.getResponsiveWidth(5),
                    paddingRight: platform.getResponsiveWidth(5),
                  }}
                >
                  <Autocomplete
                    placeholder={label}
                    Fetchfn={this.Fetchfn}
                    HandleUpdate={this.HandleAddLocalization}
                  />
                </View>
                {Array.isArray(this.state.ItemSelected) &&
                  this.state.ItemSelected.length > 0 && (
                    <ScrollView style={{ width: '100%' }}>
                      <View
                        style={{
                          width: '100%',
                          paddingTop: platform.getResponsiveHeight(2),
                          paddingBottom: platform.getResponsiveHeight(2),
                          paddingLeft: platform.getResponsiveWidth(5),
                          paddingRight: platform.getResponsiveWidth(5),
                        }}
                      >
                        <ListItemRate
                          name={name}
                          value={this.state.ItemSelected || []}
                          handlUpdate={(data) => {
                            this.setState({ ItemSelected: data });
                          }}
                          withRate={false}
                        />
                      </View>
                    </ScrollView>
                  )}

                {/* <Picker {...{ values: this.props.options, defaultValue: 0 }} /> */}
              </Content>
            </View>
          </Modal>

          {/* <RNPickerSelect
            // placeholder={placeholder}
            style={{
              color: "black",

              textAlign: "center",

              fontFamily: "Calibri",
              fontSize: platform.getRelativeWidth(18),
              lineHeight: platform.getRelativeWidth(22),
              fontWeight: "normal",
            }}
            id={name}
            onValueChange={(value) => form.setFieldValue(name, value)}
            onBlur={() => form.setFieldTouched(name)}
            value={
              form.values[name] != null && form.values[name].name != null
                ? form.values[name].name
                : form.values[name]
            }
            placeholder={{ label: placeholder, value: "" }}
            allowClear
            {...inputProps}
            items={options}
          /> */}
        </TouchableOpacity>

        {error && (
          <Text
            style={{
              fontFamily: 'Calibri',
              fontSize: platform.normalize(12),
              color: '#F57969',
              paddingLeft: platform.getRelativeWidth(15),
            }}
          >
            {error}
          </Text>
        )}
      </View>
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

class SelectFormItem extends Component {
  render() {
    let { name, style } = this.props;

    return (
      // <SkeletonContent
      //   containerStyle={{}}
      //   isLoading={loading}
      //   layout={[
      //     {
      //       key: "someId",
      //       width: style.width,
      //       height: style.height,
      //     },
      //   ]}
      // >
      <FastField name={name}>
        {({ form }) => {
          return <SelectFormItemNotFast {...this.props} form={form} />;
        }}
      </FastField>
      // </SkeletonContent>
    );
  }
  // return this.state.option == null ? (

  // ) : (
  //
  // );
}

export default SelectFormItem;
