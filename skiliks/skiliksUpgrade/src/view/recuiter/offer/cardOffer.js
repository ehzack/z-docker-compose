import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';
import UploadFile from '../../../modules/shared/upload/upload';
import LeftIcon from '../../../../assets/icons/navigation/left.svg';
import MessagingIcon from '../../../../assets/icons/messaging/messaging.svg';
import OptionCard from './optionCard';
import services from '../../../modules/recruiter/offer/offerServices';
import ItemShowImage from '../../shared/items/ItemShowImage';
import EditSVG from 'assets/icons/popular/edit.svg';
import SettingSVG from 'assets/icons/popular/setting.svg';
import OfferAction from 'src/modules/recruiter/offer/offerActions';
import { connect } from 'react-redux';
import selectors from '../../../modules/recruiter/offer/offerSelectors';
import NavigationServices from 'navigation/NavigationService';
import ServiceOffer from 'src/modules/recruiter/recruiterService';
class CardOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
      showCandidat: false,
      candidats: [],
    };
  }

  componentDidMount = async () => {
    var { item } = this.props;
    let id = item.id;
    let candidats = await ServiceOffer.listCandidatLike(id);
    this.setState({ candidats: candidats });
  };
  showOption = (flag) => {
    this.setState({ showOption: flag });
  };

  showCandidat = () => {
    this.setState({ showOption: false, showCandidat: true });
  };
  init = () => {
    this.setState({ showOption: false, showCandidat: false });
  };
  HandleUpdateForm = (id) => {
    var { dispatch } = this.props;
    dispatch(OfferAction.navigateToUpdate(id));
  };
  handleSettingForm = (id) => {
    var { dispatch } = this.props;
    var { item } = this.props;

    dispatch(OfferAction.navigateToSetting(item));
  };
  handleDetail = () => {
    var { dispatch } = this.props;
    var { item } = this.props;
    dispatch(OfferAction.navigateToDetail(item));
  };
  render() {
    var { item, changeStatus, index, showDetail, loading } = this.props;
    var { showOption, showCandidat, candidats } = this.state;

    return (
      <View
        style={{
          width: '100%',
          paddingTop: platform.getResponsiveHeight(2),
          paddingBottom: platform.getResponsiveHeight(2),
          paddingLeft: platform.getResponsiveWidth(2),
          paddingRight: platform.getResponsiveWidth(2),
          backgroundColor: 'transparent',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.handleDetail();
          }}
          // disabled={showDetail || showOption || showCandidat}
          style={{
            width: '100%',
            borderRadius: 50,
            height: platform.getResponsiveHeight(8),
            padding: platform.normalize(8),
            justifyContent: 'center',
            backgroundColor: 'white',
            shadowColor: '#0000',
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
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ItemShowImage
                source={item.company_logo}
                mode="company"
                style={{
                  width: platform.normalize(40),
                  height: platform.normalize(40),
                  borderWidth: 3,
                  borderRadius: 100,
                  borderColor: platform.brandPrimary,
                }}
              />
              <View style={{ padding: platform.normalize(12) }}>
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(15),
                  }}
                >
                  {item.company_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Calibri',
                    fontSize: platform.normalize(14),
                    opacity: 0.4,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => this.HandleUpdateForm(item.id)}
                style={{ padding: platform.normalize(5) }}
              >
                <View
                  style={{
                    width: platform.normalize(30),
                    height: platform.normalize(30),
                    borderRadius: 100,
                    backgroundColor: '#DADADA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <EditSVG
                    width={platform.normalize(15)}
                    height={platform.normalize(15)}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleSettingForm()}
                style={{ padding: platform.normalize(5) }}
              >
                <View
                  style={{
                    width: platform.normalize(30),
                    height: platform.normalize(30),
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
                </View>
              </TouchableOpacity>
              <View style={{ padding: platform.normalize(5) }}>
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
                  <Text
                    style={{
                      fontFamily: 'CalibriBold',
                      fontSize: platform.normalize(15),
                      color: 'white',
                    }}
                  >
                    {candidats.length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(CardOffer);
