import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
} from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';
import UploadFile from '../../../modules/shared/upload/upload';
import LeftIcon from '../../../../assets/icons/navigation/left.svg';
import MessagingIcon from '../../../../assets/icons/messaging/messaging.svg';
import OptionCard from './optionCard';
import ItemShowImage from '../../shared/items/ItemShowImage';
import EditSVG from 'assets/icons/popular/edit.svg';
import SettingSVG from 'assets/icons/popular/setting.svg';
import OfferAction from 'src/modules/recruiter/offer/offerActions';
import { connect } from 'react-redux';
import selectors from '../../../modules/recruiter/offer/offerSelectors';
import ViewMain from '../../shared/styles/ViewMainOffer';
import BACKICON from 'assets/icons/navigation/arrowL.svg';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import services from 'src/modules/recruiter/offer/offerServices';
import PlusSvg from 'assets/icons/popular/plus.svg';
import NavigationServices from 'navigation/NavigationService';

import i18n from 'i18n/index';
import ArrowActive from 'assets/icons/navigation/leftWhite.svg';
import ArrowDisable from 'assets/icons/navigation/left.svg';
const styles = StyleSheet.create({
  StatusContainers: {
    width: '100%',
    height: '22%',
    paddingTop: platform.getResponsiveHeight(1),
    paddingBottom: platform.getResponsiveHeight(1),
  },
  StatusTextLabel: {
    fontFamily: 'Calibri',
    fontSize: platform.normalize(18),
  },
  StatusLabel: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
class SettingOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      Transformation: new Animated.Value(0),
      status: 'DRA',
    };
  }
  componentDidMount = () => {
    var { item } = this.props;
    this.setState({ status: item.status_code });
  };

  draftPubAdd = (flag) => {
    console.log(flag);
    var { id } = this.props.item;
    services.change_status_ads(id, flag ? 'PUB' : 'DRA');
    this.setState({ status: flag ? 'PUB' : 'DRA' });
  };
  archiveAdd = () => {
    var { id } = this.props.item;
    services.change_status_ads(id, 'ARC');
    this.setState({ status: 'ARC' });
  };
  changeStatus = (flag) => {
    if (!!flag) {
      Animated.timing(this.state.Transformation, {
        toValue: 1,
        duration: 500,
        easing: Easing.back(0.8),
      }).start(() => {
        this.setState({ showDetail: flag });
      });
    } else {
      Animated.timing(this.state.Transformation, {
        toValue: 0,
        duration: 500,
        easing: Easing.back(0.8),
      }).start(() => {
        this.setState({ showDetail: flag });
      });
    }
  };
  StatusContainers = () => {
    var { item } = this.props;

    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
        <View style={styles.StatusContainers}>
          <View style={[styles.StatusLabel]}>
            <Text style={styles.StatusTextLabel}>
              {i18n.t(`user.recruiter.offer.common.disableOffer`)}
            </Text>
            <Switch
              trackColor={{ false: '#EFF1F6', true: '#EFF1F6' }}
              thumbColor={platform.brandPrimary}
              value={this.state.status == 'PUB' ? true : false}
              style={{
                width: platform.getRelativeWidth(51),
                height: platform.getRelativeHeight(30),
                position: 'absolute',
                right: '5%',
              }}
              onValueChange={this.draftPubAdd}
            />
          </View>
        </View>

        <View style={styles.StatusContainers}>
          <TouchableOpacity
            onPress={() => this.archiveAdd()}
            disabled={this.state.status == 'ARC'}
            style={[
              styles.StatusLabel,
              {
                backgroundColor:
                  this.state.status == 'ARC' ? 'rgba(0,0,0,0.1)' : 'white',
              },
            ]}
          >
            <Text style={styles.StatusTextLabel}>
              {i18n.t(`user.recruiter.offer.common.archiveOffer`)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.StatusContainers}>
          <View style={styles.StatusLabel}>
            <Text style={styles.StatusTextLabel}>
              {i18n.t(`user.recruiter.offer.common.deleteOffer`)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  candidat_Like_containers = () => {
    var { item, candidat } = this.props;
    console.log(candidat);
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <FlatList
          contentContainerStyle={{}}
          data={candidat}
          renderItem={({ item }) => (
            <View
              style={{
                width: '100%',
                paddingTop: platform.getResponsiveHeight(1),
                paddingBottom: platform.getResponsiveHeight(1),
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                }}
              >
                <ItemShowImage
                  source={item.avatar_profile}
                  style={{
                    width: platform.normalize(40),
                    height: platform.normalize(40),
                    borderRadius: 100,
                  }}
                />
                <View style={{ paddingLeft: platform.getResponsiveWidth(5) }}>
                  <Text
                    style={{
                      fontFamily: 'CalibriBold',
                      color: '#151522',
                      fontSize: platform.normalize(15),
                    }}
                  >
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Calibri',
                      color: '#999999',
                      fontSize: platform.normalize(11),
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: ' rgba(228, 228, 228, 0.6)',
              }}
            ></View>
          )}
        />
      </View>
    );
  };
  getColor = (code) => {
    switch (code) {
      case 'PUB':
        return platform.brandInfo;
      case 'CLO':
        return 'red';
      case 'ARC':
        return '#C0C0C0';
      case 'DRA':
        return platform.brandPrimary;
    }
  };

  handleSettingForm = (id) => {
    var { dispatch } = this.props;
    var { item } = this.props;

    dispatch(OfferAction.navigateToSetting(item));
  };

  HandleUpdateForm = (id) => {
    var { dispatch } = this.props;
    dispatch(OfferAction.navigateToUpdate(id));
  };
  list_candidat = () => {
    var { item, candidat } = this.props;
    return (
      <View
        style={{
          zIndex: 99999,
          position: 'absolute',
          left: '106%',
          bottom: '92%',
        }}
      >
        {Array.isArray(candidat) &&
          candidat.map((e) => (
            <ItemShowImage
              source={e.avatar_profile}
              style={{
                width: platform.normalize(25),
                height: platform.normalize(25),
                borderRadius: 100,
                marginTop: -5,
              }}
            />
          ))}
      </View>
    );
  };

  navigation_container = () => {
    var { item, candidat } = this.props;

    return (
      <View
        style={{
          zIndex: 99999,
          position: 'absolute',
          flexDirection: 'row',
          bottom: '100%',
          left: '80%',
          width: platform.getResponsiveWidth(25),
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => this.handleSettingForm()}
          style={{
            width: platform.normalize(25),
            height: platform.normalize(25),
            borderRadius: 100,
            backgroundColor: '#DADADA',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SettingSVG
            width={platform.normalize(15)}
            height={platform.normalize(15)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.HandleUpdateForm(item.id)}
          style={{
            width: platform.normalize(25),
            height: platform.normalize(25),
            borderRadius: 100,
            backgroundColor: platform.brandPrimary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EditSVG
            width={platform.normalize(12)}
            height={platform.normalize(12)}
          />
        </TouchableOpacity>
        <View
          style={{
            width: platform.normalize(25),
            height: platform.normalize(25),
            borderRadius: 100,
            backgroundColor: platform.brandInfo,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'CalibriBold',
              fontSize: platform.normalize(12),
            }}
          >
            {(Array.isArray(candidat) && candidat.length) || 0}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    var { item, candidat } = this.props;
    var { showDetail } = this.state;
    return (
      <ViewMain DisableGoBack={true}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: platform.getResponsiveWidth(80),
              backgroundColor: 'white',
              borderRadius: 25,
              paddingLeft: platform.getResponsiveWidth(5),
              paddingRight: platform.getResponsiveWidth(5),
              paddingTop: platform.getResponsiveHeight(1),
              paddingBottom: platform.getResponsiveHeight(1),
              top: -platform.getResponsiveHeight(5),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <View
              style={{
                width: platform.getResponsiveWidth(10),
                height: platform.getResponsiveHeight(15),
                position: 'absolute',
                right: -platform.getResponsiveWidth(5),
                bottom: '50%',

                backgroundColor: 'white',
                borderRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.changeStatus(true);
                }}
                style={{
                  width: '100%',
                  height: '50%',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,

                  backgroundColor: !showDetail ? platform.brandInfo : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {!!showDetail && (
                  <ArrowDisable
                    style={{
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                )}
                {!showDetail && (
                  <ArrowActive
                    style={{
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.changeStatus(false);
                }}
                style={{
                  width: '100%',
                  height: '50%',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: !!showDetail ? platform.brandInfo : 'white',
                }}
              >
                {!!showDetail && <ArrowActive />}
                {!showDetail && <ArrowDisable />}
              </TouchableOpacity>
            </View>

            <View style={{ height: '10%', width: '100%' }}>
              <TouchableOpacity
                onPress={() => NavigationServices.goBack()}
                style={{
                  height: '100%',
                  width: '20%',
                  justifyContent: 'center',
                }}
              >
                <BACKICON />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '20%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ItemShowImage
                source={item.company_logo}
                mode={'company'}
                style={{
                  width: platform.normalize(80),
                  height: platform.normalize(80),
                  borderRadius: 100,
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingLeft: platform.getResponsiveWidth(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(22),
                  }}
                >
                  {item.company_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Calibri',
                    fontSize: platform.normalize(13),
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Calibri',
                    fontSize: platform.normalize(12),
                    opacity: 0.5,
                  }}
                >
                  {Array.isArray(item.localizations)
                    ? item.localizations[0].label
                    : ''}
                </Text>
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(12),
                    color: this.getColor(item.status_code),
                  }}
                >
                  {i18n.t(`user.recruiter.offer.status.${item.status_code}`)}
                </Text>
              </View>
            </View>

            {!showDetail && (
              <Animated.View
                style={{
                  width: '100%',
                  height: '53%',
                  paddingTop: platform.getResponsiveHeight(2),
                  opacity: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  transform: [
                    {
                      translateX: interpolate(this.state.Transformation, {
                        inputRange: [0, 1],
                        outputRange: [0, platform.getResponsiveWidth(20)],
                      }),
                    },
                  ],
                }}
              >
                {this.StatusContainers()}
              </Animated.View>
            )}

            {!!showDetail && (
              <Animated.View
                style={{
                  width: '100%',
                  height: '53%',

                  paddingTop: platform.getResponsiveHeight(2),
                  opacity: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateX: interpolate(this.state.Transformation, {
                        inputRange: [0, 1],
                        outputRange: [-platform.getResponsiveWidth(100), 0],
                      }),
                    },
                  ],
                }}
              >
                {this.candidat_Like_containers()}
              </Animated.View>
            )}
            <View
              style={{
                flexDirection: 'row',
                padding: platform.normalize(10),
                position: 'absolute',
                left: '50%',
                right: '50%',
                bottom: '5%',
              }}
            >
              <View style={{ padding: platform.normalize(2) }}>
                <Animated.View
                  style={{
                    backgroundColor: !showDetail
                      ? platform.brandInfo
                      : '#D5E2FF',
                    width: this.state.Transformation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        platform.getResponsiveWidth(7),
                        platform.getResponsiveWidth(3),
                      ],
                    }),
                    height: platform.getResponsiveHeight(1),
                    borderRadius: 25,
                  }}
                ></Animated.View>
              </View>
              <View style={{ padding: platform.normalize(2) }}>
                <Animated.View
                  style={{
                    backgroundColor: !!showDetail
                      ? platform.brandInfo
                      : '#D5E2FF',
                    width: this.state.Transformation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        platform.getResponsiveWidth(3),
                        platform.getResponsiveWidth(7),
                      ],
                    }),
                    height: platform.getResponsiveHeight(1),
                    borderRadius: 25,
                  }}
                ></Animated.View>
              </View>
            </View>
            {this.list_candidat()}
            {this.navigation_container()}
          </View>

          <TouchableOpacity
            onPress={() =>
              NavigationServices.NavigateToNested('RecruiterStack', 'FormOffer')
            }
            style={{
              width: '80%',
              height: '10%',
              backgroundColor: 'white',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',

              borderRadius: 500,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'CalibriBold',
                fontSize: platform.normalize(15),
              }}
            >
              {i18n.t(`user.recruiter.offer.common.createOffer`)}
            </Text>

            <View
              style={{
                width: platform.normalize(30),
                height: platform.normalize(30),
                borderRadius: 100,
                backgroundColor: platform.brandInfo,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlusSvg
                width={platform.normalize(15)}
                height={platform.normalize(15)}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ViewMain>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  item: selectors.item_to_edit(state),
  candidat: selectors.selectCandidatLikeAd(state),
});

export default connect(mapStateToProps)(SettingOffer);
