import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ViewMainHome from '../../view/shared/styles/ViewMainHome';
import ViewEmptyData from '../../view/shared/styles/ViewEmptyData';

import platfom from '../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../modules/recruiter/recruiterSelectors';
import File from '../../modules/shared/upload/upload';
import PulseMain from './mainHome/pulse';
import EmptyData from './mainHome/EmptyData';

import Swipe from './mainHome/swipe';
import Offer from './mainHome/Offer';
import actions from '../../modules/recruiter/recruiterActions';
class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = { local_loading: true, forceShow: false, onBlure: false };
  }
  componentDidMount = () => {
    let { dispatch, navigation } = this.props;
    this.props.navigation.addListener('willFocus', this.load);

    setTimeout(() => {
      this.setState({ local_loading: false });
      dispatch(actions.DoListAdsHome());
    }, 3000);
  };

  load = () => {
    let { dispatch } = this.props;
    this.setState({ onBlure: true });

    dispatch(actions.DoListAdsHome());
  };

  setView = (nb) => {
    this.setState({ forceShow: true });
  };
  render() {
    let { loading, listAds } = this.props;
    let { local_loading, forceShow, onBlure } = this.state;

    if (onBlure) {
      return (
        <ViewMainHome>
          <Swipe />
        </ViewMainHome>
      );
    }
    if (forceShow) {
      return (
        <ViewMainHome>
          <Swipe />
        </ViewMainHome>
      );
    }
    if (loading || local_loading) {
      return (
        <ViewMainHome>
          <PulseMain />
        </ViewMainHome>
      );
    } else if (!loading && !local_loading && listAds.length > 0) {
      return (
        <ViewMainHome>
          <Swipe />
        </ViewMainHome>
      );
    } else {
      return (
        <ViewEmptyData>
          <EmptyData />
        </ViewEmptyData>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  listAds: selectors.selectListAds(state),
  loading: selectors.selectLoadingInit(state),
});

export default connect(mapStateToProps)(MainHome);
