import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import platfom from '../../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../../modules/candidat/candidatSelectors';
import selectorsAuth from '../../../modules/auth/authSelectors';
import actionChat from '../../../modules/chats/chatsActions';

import File from '../../../modules/shared/upload/upload';
import Swiper from 'react-native-deck-swiper';
import Card from './Card';
import Detail from './Detail';
import service from '../../../modules/candidat/candidatService';
import PincelDisable from '../../../../assets/icons/popular/pincelDisable.svg';
import ModalSwipe from 'src/view/shared/items/modalSwipe';
import ItemShowImage from 'src/view/shared/items/ItemShowImage';
import NavifationServices from 'navigation/NavigationService';

class PulseMain extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.state = {
      loading: true,
      showDetail: false,
      item: null,
      currentAd: null,
      indexFeed: 0,
      endOfSwipe: false,
      showModal: false,
      recruiter_id: null,
    };
  }

  componentDidMount = async () => {
    var { listFeeds } = this.props;
    var { indexFeed } = this.state;
    if (listFeeds.length > 0) {
      let newAd = await service.detailfeedsAds(listFeeds[indexFeed].ad_id);
      console.log(newAd);
      this.setState({
        currentAd: newAd,
      });
    }
    this.setState({
      loading: false,
    });
  };

  nextAd = async () => {
    try {
      var { listFeeds } = this.props;
      var { indexFeed } = this.state;

      if (indexFeed + 1 < listFeeds.length) {
        console.log(`IndexFeed : ${indexFeed} | Lenght:${listFeeds.length}`);
        let newAd = await service.detailfeedsAds(
          listFeeds[indexFeed + 1].ad_id,
        );
        this.setState({ currentAd: newAd, indexFeed: indexFeed + 1 });
      } else {
        this.setState({ endOfSwipe: true, currentAd: null });
      }
    } catch (e) {
      console.log(e);
      this.setState({ endOfSwipe: true, currentAd: null });
    }
  };
  handleShowDetail = (item) => {
    this.setState({ item: item, showDetail: true });
  };
  handleSwipeLeft = async (e, data) => {
    let { listFeeds } = this.props;
    let { currentAd, indexFeed } = this.state;
    let feed_id = listFeeds[indexFeed].id;

    service.OnSwiped(feed_id, false);

    await this.nextAd();
  };
  handleSwipeRight = async (e, data) => {
    let { candidat_id, listFeeds } = this.props;
    let { currentAd, indexFeed } = this.state;
    let feed_id = listFeeds[indexFeed].id;
    let feedData = listFeeds[indexFeed];

    console.log('********************* Candidat *******************');
    console.log(feedData);
    console.log(feedData.is_recruiter_liked == true ? true : false);
    await service.OnSwiped(feed_id, true);

    this.setState({
      showModal: feedData.is_recruiter_liked == true ? true : false,
    });

    await this.nextAd();
  };

  closeModal = () => {
    this.setState({ item: null, showDetail: false });
  };

  toDisscution = () => {
    let { dispatch } = this.props;
    dispatch(actionChat.DoGetChat());
  };
  test = () => {
    fetch('/admin/api/2021-01/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        order: {
          email: 'foo@example.com',
          fulfillment_status: 'fulfilled',
          send_receipt: true,
          send_fulfillment_receipt: true,
          line_items: [
            {
              variant_id: 457924702,
              quantity: 1,
            },
          ],
        },
      }),
    });
  };
  render() {
    var { currentAd, endOfSwipe, showModal } = this.state;

    var {
      loading,
      listFeeds,
      avatar_profile,
      FullName,
      candidat_id,
      like_count,
    } = this.props;
    if (loading || listFeeds.length == 0) {
      return <View></View>;
    }

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
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.2,
            padding: platfom.normalize(5),
          }}
        >
          <View
            style={{
              width: '80%',
              height: '45%',
              borderRadius: 50,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: platfom.normalize(10),
              alignItems: 'center',
              marginTop: platfom.getResponsiveHeight(4),
            }}
          >
            <ItemShowImage
              source={avatar_profile}
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
                {FullName}
              </Text>
              <Text
                style={{
                  fontFamily: 'Calibri',
                  fontSize: platfom.normalize(15),
                  color: 'black',
                  opacity: 0.8,
                }}
              >
                {candidat_id.title}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: platfom.normalize(5) }}>
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
              </View>

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
                    {like_count}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {!endOfSwipe && !loading && currentAd != null && (
            <Swiper
              ref={(ref) => {
                this.swiper = ref;
              }}
              useViewOverflow={Platform.OS === 'ios'}
              cards={[currentAd]}
              infinite
              backgroundColor={'transparent'}
              cardVerticalMargin={0}
              animateOverlayLabelsOpacity
              animateCardOpacity
              disableTopSwipe
              disableBottomSwipe
              onSwipedLeft={this.handleSwipeLeft}
              onSwipedRight={this.handleSwipeRight}
              verticalSwipe={false}
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
                        { translateX: platfom.getResponsiveWidth(6) },
                        { translateY: platfom.getResponsiveHeight(20) },
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
                        { translateX: platfom.getResponsiveWidth(42) },
                        { translateY: platfom.getResponsiveHeight(15) },
                      ],
                    },
                  },
                },
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
                console.log('onSwipedAll');
              }}
              cardIndex={0}
            />
          )}
        </View>

        {!endOfSwipe && !loading && currentAd != null && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
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
  listFeeds: selectors.selectListFeeds(state),
  candidat_id: selectors.selectCandidatId(state),
  like_count: selectors.selectLikeCount(state),
  avatar_profile: selectorsAuth.selectAvatar(state),
  FullName: selectorsAuth.selectCurrentUserFullName(state),
});

export default connect(mapStateToProps)(PulseMain);
