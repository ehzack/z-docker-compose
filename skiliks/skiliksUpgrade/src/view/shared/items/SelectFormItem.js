import React, { Component } from 'react';
import { Form, View, Button, Item } from 'native-base';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import DictioanryService from '../../../modules/dictionary/dictionaryService';
// import SkeletonContent from "react-native-skeleton-content";
import platform from '../../../../native-base-theme/variables/platform';
import Modal from 'react-native-modal';
import Picker from './picker/picker';
import HandSVG from 'assets/3DElements/hand.svg';

import {
  PanGestureHandler,
  State,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
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

class SelectFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      itemSelected: 0,
    };
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

    this.setState({ itemSelected: item });

    this.flatList.scrollToItem({ item, animated: false });
  };
  handlePress = () => {
    let { options, form, name, onChange } = this.props;

    form.setFieldValue(name, options[this.state.itemSelected]);
    this.setState({ openModal: false });
    if (onChange) {
      onChange(options[this.state.itemSelected]);
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
      options,
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
      withHeadIcon,
    } = this.props;
    var { itemSelected } = this.state;
    return (
      <View
        style={{
          width: '100%',
          paddingTop: scroll ? platform.getResponsiveHeight(2) : 0,
          paddingBottom: scroll ? platform.getResponsiveHeight(2) : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ openModal: true });
          }}
          style={[
            {
              ...style,
              alignItems: 'center',
              flexDirection: 'row',
              color: '#2C2929',
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
                shadowOpacity: 0.08,
                shadowRadius: 5,
                shadowOffset: { height: 4, width: 0 },
                elevation: 5,
              },
            }),
          ]}
        >
          <Text
            style={[
              {
                fontSize: platform.getRelativeWidth(14),
                fontFamily: 'Calibri',
                color: '#2C2929',
              },
              !((value && value.name) || value || (value && value.label))
                ? { opacity: 0.4 }
                : null,
            ]}
          >
            {value == undefined
              ? label
              : !!(value && value.name && value.name != undefined)
              ? value.name
              : !!value && !!value.label
              ? value.label
              : typeof value != typeof {}
              ? value
              : label}
          </Text>
          <Image
            style={{
              position: 'absolute',
              right: platform.getRelativeWidth(17),
            }}
            source={require('../../../../assets/icons/navigation/arrow-botom.png')}
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
            backdropColor={withHeadIcon ? 'black' : 'white'}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '30%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            >
              {withHeadIcon && (
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
              )}
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
              {/* 
              {gestureHandlerRootHOC(() => (
                <Picker {...{ values: this.props.options, defaultValue: 0 }} />
              ))} */}

              <FlatList
                ref={(ref) => (this.flatList = ref)}
                data={options}
                onScroll={(e) => this.handleScroll(e, options.length)}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      {
                        width: '100%',
                        height: platform.getRelativeHeight(41),
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      this.state.itemSelected == index
                        ? {
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                            borderColor: 'rgba(37, 42, 49, 0.2)',
                          }
                        : {
                            // opacity:
                            //   (options.length -
                            //     Math.abs(index - this.state.itemSelected)) /
                            //   (15 * options.length),
                          },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: platform.getRelativeWidth(22),
                        color: '#252A31',
                        fontFamily: 'Calibri',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                //extraData={selected}
              />

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: platform.getRelativeWidth(153),
                    height: platform.getRelativeHeight(5),
                    backgroundColor: platform.brandPrimary,
                    borderRadius: 100,
                  }}
                ></View>
              </View>
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
  constructor() {
    super();
    this.state = { option: [], loading: true };
  }

  async componentDidMount() {
    var optionFinal = [];
    var { fields, actions, style } = this.props;
    if (fields.study_level && this.props.name == fields.study_level.name) {
      let option = await DictioanryService.listDictionary('SDL');

      optionFinal = option.map((item) => ({
        id: item.id,
        name: `${item.name}`,
      }));
    }
    if (fields.company && this.props.name == fields.company.name) {
      let option = await DictioanryService.listDictionary('CPN');

      optionFinal = option;
    }
    if (fields.language && this.props.name == fields.language.name) {
      let option = await DictioanryService.listDictionaryI18n();

      optionFinal = option;
    }

    if (fields.currency && this.props.name == fields.currency.name) {
      let option = await DictioanryService.listDictionary('CURRENCY');

      optionFinal = option;
    }
    if (fields.language && this.props.name == fields.timezone.name) {
      let option = await DictioanryService.listDictionary('TIMEZONE');

      optionFinal = option;
    }

    if (fields.status && this.props.name == fields.status.name) {
      let option = await DictioanryService.listDictionary('STATUS');
      optionFinal = option;
    }

    if (fields.availability && this.props.name == fields.availability.name) {
      let option = await DictioanryService.listDictionary('AVL');
      optionFinal = option;
    }
    if (fields.gender && this.props.name == fields.gender.name) {
      let option = await DictioanryService.listDictionary('GNDR');
      optionFinal = option;
    }

    if (
      (fields.work_years_number &&
        this.props.name == fields.work_years_number.name) ||
      (fields.work_years_experience &&
        this.props.name == fields.work_years_experience.name)
    ) {
      optionFinal = Array.from(Array(10).keys()).map((item) => {
        return {
          id: item,
          name: `${item}`,
        };
      });
    }

    if (fields.activity_area && this.props.name == fields.activity_area.name) {
      let option = await DictioanryService.listDictionary('ACTAREA');
      optionFinal = option;
      console.log(option);
    }

    if (fields.company_type && this.props.name == fields.company_type.name) {
      let option = await DictioanryService.listDictionary('CPNTYPE');

      optionFinal = option;
    }

    if (fields.company_size && this.props.name == fields.company_size.name) {
      optionFinal = option;
    }

    this.setState({ option: optionFinal, loading: false });
  }
  render() {
    let { name, style } = this.props;
    let { option, loading } = this.state;
    if (this.state.loading) return <View></View>;

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
          return (
            <SelectFormItemNotFast
              {...this.props}
              options={option}
              form={form}
            />
          );
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
