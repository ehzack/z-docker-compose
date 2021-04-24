import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import platfom from '../../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../../modules/recruiter/recruiterSelectors';
import File from '../../../modules/shared/upload/upload';
import Swiper from 'react-native-deck-swiper';
import Card from './Card';
import Detail from './Detail';
import action from '../../../modules/recruiter/recruiterActions';
import actionChat from '../../../modules/chats/chatsActions';

import service from '../../../modules/recruiter/recruiterService';
import NavigationServices from 'navigation/NavigationService';
import ModalSwipe from 'src/view/shared/items/modalSwipe';
import PincelDisable from '../../../../assets/icons/popular/pincelDisable.svg';
import ItemShowImage from 'src/view/shared/items/ItemShowImage';
import PlusSvg from 'assets/icons/popular/plus.svg';
import OfferAction from 'src/modules/recruiter/offer/offerActions';
import Pulse from 'react-native-pulse';
import Authselectors from '../../../modules/auth/authSelectors';

class PulseMain extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.state = {
      showDetail: false,
      item: 0,
      endOfSwipe: false,
      showModal: false,
      candidat_id: null,
    };
  }

  handleShowDetail = (item) => {
    this.setState({ item: item, showDetail: true });
  };
  handleSwipeLeft = async (e, data) => {
    await service.OnSwipe(data.feed_id, false);

    this.closeModal();
  };
  handleSwipeRight = async (e, data) => {
    await service.OnSwipe(data.feed_id, true);
    this.setState({
      showModal: data.is_candidate_liked == true ? true : false,
      candidat_id: data.user_id,
    });
  };

  closeModal = () => {
    this.setState({ item: null, showDetail: false });
  };

  HandleUpdateForm = (id) => {
    var { dispatch } = this.props;
    console.log(id);
    dispatch(OfferAction.navigateToUpdate(id));
  };
  changeAd = (ad_id) => {
    var { dispatch } = this.props;

    dispatch(action.DoChangeAds(ad_id));
  };

  toDisscution = () => {
    let { dispatch } = this.props;
    let { candidat_id } = this.state;
    dispatch(actionChat.DoGetChat(candidat_id, 'candidat'));
  };

  render() {
    var { endOfSwipe, showModal } = this.state;

    var {
      listAds,
      candidats_like_ad,
      loadingInit,
      currentAds,
      loading,
      AvatarProfile,
    } = this.props;

    if (loadingInit) return <View></View>;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {showModal && (
          <ModalSwipe
            onSubmit1={() => {
              this.toDisscution();

              this.setState({ showModal: false });
            }}
            onSubmit2={() => {
              this.setState({ showModal: false });
            }}
            TitleHeader={'New Match !'}
            Description={
              'Start discussing with your match about the offer details'
            }
            TitleButton1={'Chat Now'}
            TitleButton2={' Keep Discovering'}
            duoButton={true}
          />
        )}
        <View
          style={{
            flex: 0.12,
            width: '100%',
            paddingBottom: platfom.getResponsiveHeight(2),
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {listAds.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginLeft: index == 0 ? platfom.getResponsiveWidth(15) : 0,
                    width: platfom.getResponsiveWidth(70),
                    height: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',

                    padding: platfom.normalize(2),
                    paddingLeft: platfom.getResponsiveWidth(1),
                    paddingRight: platfom.getResponsiveWidth(1),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.changeAd(item.id);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: platfom.normalize(10),
                      alignItems: 'center',
                    }}
                  >
                    <ItemShowImage
                      source={item.company_logo}
                      mode="company"
                      style={{
                        width: platfom.normalize(40),
                        height: platfom.normalize(40),
                        borderRadius: 100,
                      }}
                    />

                    <View>
                      <Text
                        style={{
                          fontFamily: 'CalibriBold',
                          fontSize: platfom.normalize(15),
                          color: 'black',
                        }}
                      >
                        {item.company_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Calibri',
                          fontSize: platfom.normalize(15),
                          color: 'black',
                          opacity: 0.8,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => this.HandleUpdateForm(item.id)}
                        style={{ padding: platfom.normalize(5) }}
                      >
                        <View
                          style={{
                            width: platfom.normalize(30),
                            height: platfom.normalize(30),
                            borderRadius: 100,
                            backgroundColor: '#DADADA',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <PincelDisable
                            width={platfom.normalize(15)}
                            height={platfom.normalize(15)}
                          />
                        </View>
                      </TouchableOpacity>

                      <View style={{ padding: platfom.normalize(5) }}>
                        <View
                          style={{
                            width: platfom.normalize(30),
                            height: platfom.normalize(30),
                            borderRadius: 100,
                            backgroundColor: platfom.brandInfo,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'CalibriBold',
                              fontSize: platfom.normalize(16),
                              color: 'white',
                            }}
                          >
                            {item.count}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            <View
              style={{
                marginLeft:
                  listAds.length == 0 ? platfom.getResponsiveWidth(15) : 0,
                width: platfom.getResponsiveWidth(70),
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: platfom.normalize(2),
                paddingLeft: platfom.getResponsiveWidth(1),
                paddingRight: platfom.getResponsiveWidth(1),
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: platfom.normalize(10),
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: 'CalibriBold',
                      fontSize: platfom.normalize(15),
                      color: 'black',
                    }}
                  >
                    {'Create Offer'}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationServices.NavigateToNested(
                        'RecruiterStack',
                        'FormOffer',
                      )
                    }
                    style={{ padding: platfom.normalize(5) }}
                  >
                    <View
                      style={{
                        width: platfom.normalize(30),
                        height: platfom.normalize(30),
                        borderRadius: 100,
                        backgroundColor: platfom.brandInfo,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <PlusSvg
                        width={platfom.normalize(15)}
                        height={platfom.normalize(15)}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.68,
          }}
        >
          {!loading &&
          Array.isArray(candidats_like_ad) &&
          candidats_like_ad.length > 0 ? (
            <Swiper
              ref={(ref) => {
                this.swiper = ref;
              }}
              useViewOverflow={Platform.OS === 'ios'}
              cards={candidats_like_ad}
              backgroundColor={'transparent'}
              cardVerticalMargin={0}
              animateOverlayLabelsOpacity
              animateCardOpacity
              disableTopSwipe
              disableBottomSwipe
              onSwipedLeft={this.handleSwipeLeft}
              onSwipedRight={this.handleSwipeRight}
              // horizontalThreshold={platfom.deviceWidth / 10}
              overlayOpacityHorizontalThreshold={platfom.deviceWidth / 10}
              inputOverlayLabelsOpacityRangeX={[
                -platfom.deviceWidth / 11,
                -platfom.deviceWidth / 12,
                0,
                platfom.deviceWidth / 12,
                platfom.deviceWidth / 11,
              ]}
              outputOverlayLabelsOpacityRangeX={[1, 0, 0, 0, 1]}
              animateOverlayLabelsOpacity={true}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  style: {
                    label: {
                      borderColor: '#FF5068',
                      color: '#FF5068',
                      borderWidth: 1,
                      fontSize: platfom.normalize(45),
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      transform: [
                        { rotate: '-32.79deg' },
                        { translateX: platfom.getResponsiveWidth(28) },
                        { translateY: platfom.getResponsiveHeight(18) },
                      ],
                    },
                  },
                },
                right: {
                  title: 'LIKE',
                  style: {
                    label: {
                      borderColor: platfom.brandInfo,
                      color: platfom.brandInfo,
                      borderWidth: 1,
                      fontSize: platfom.normalize(45),
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',

                      transform: [
                        { rotate: '-25deg' },
                        { translateX: platfom.getResponsiveWidth(50) },
                        { translateY: platfom.getResponsiveHeight(12) },
                      ],
                    },
                  },
                },
              }}
              cardStyle={{
                paddingLeft: platfom.getResponsiveWidth(3),
                paddingRight: platfom.getResponsiveWidth(3),
              }}
              renderCard={(card, i) => {
                return (
                  <Card
                    card={card}
                    HandlePress={this.handleShowDetail}
                    index={i}
                  />
                );
              }}
              onSwiped={(cardIndex) => {}}
              onSwipedAll={() => {
                this.setState({ endOfSwipe: true });
              }}
              cardIndex={0}
            />
          ) : (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pulse
                color={'white'}
                numPulses={15}
                diameter={platfom.getResponsiveWidth(100)}
                speed={10}
                style={{
                  opacity: 0.1,
                }}
                duration={500}
              />
              <ItemShowImage
                source={AvatarProfile}
                style={{
                  width: platfom.getRelativeWidth(87),
                  height: platfom.getRelativeWidth(87),
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: platfom.brandPrimary,
                }}
              />
            </View>
          )}
        </View>

        {/* 
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showDetail}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        > */}
        {this.state.showDetail == true ? (
          <Detail item={this.state.item} closeModal={this.closeModal} />
        ) : null}

        {/* </Modal> */}
        {!loading && candidats_like_ad.length > 0 && !endOfSwipe && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: platfom.getResponsiveHeight(1),
            }}
          >
            <TouchableOpacity
              style={{ padding: platfom.normalize(12) }}
              onPress={(e) => this.swiper.swipeLeft()}
            >
              <Image
                style={{
                  borderWidth: 1,
                  borderColor: '#FF5068',
                  borderRadius: 100,
                }}
                source={require('../../../../assets/icons/popular/Nope.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: platfom.normalize(12) }}
              onPress={(e) => this.swiper.swipeRight()}
            >
              <Image
                style={{
                  borderWidth: 1,
                  borderColor: '#14D2B8',
                  borderRadius: 100,
                }}
                source={require('../../../../assets/icons/popular/Like.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  listAds: selectors.selectListAds(state),
  candidats_like_ad: selectors.selectListCandidatLikeAd(state),
  currentAds: selectors.selectCurrentAds(state),
  loadingInit: selectors.selectLoadingInit(state),
  AvatarProfile: Authselectors.selectAvatar(state),
});

export default connect(mapStateToProps)(PulseMain);
