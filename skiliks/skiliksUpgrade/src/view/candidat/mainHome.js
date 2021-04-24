import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ViewMainHome from '../../view/shared/styles/ViewMainHome';
import platfom from '../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../modules/candidat/candidatSelectors';
import File from '../../modules/shared/upload/upload';
import PulseMain from './mainHome/pulse';
import Swipe from './mainHome/swipe';
import actions from '../../modules/candidat/candidatActions';
import ViewEmptyData from '../../view/shared/styles/ViewEmptyData';
import EmptyData from './mainHome/EmptyData';

class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = { local_loading: true };
  }
  componentDidMount = () => {
    var { dispatch } = this.props;
    // dispatch(actions.DoListFeedsCandidat());
    this.props.navigation.addListener('willFocus', this.load);

    setTimeout(() => {
      this.setState({ local_loading: false });
    }, 3000);
  };

  load = () => {
    let { dispatch } = this.props;

    dispatch(actions.DoListFeedsCandidat());
  };
  render() {
    var { loading, listFeeds } = this.props;
    var { local_loading } = this.state;

    if (local_loading || loading) {
      return (
        <ViewMainHome>
          <PulseMain />
        </ViewMainHome>
      );
    } else if (listFeeds.length > 0) {
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
  loading: selectors.selectLoading(state),
  AvatarProfile: selectors.selectAvatarProfile(state),
  listFeeds: selectors.selectListFeeds(state),
  firstAds: selectors.selectAds(state),
  candidat_id: selectors.selectCandidatId(state),
});

export default connect(mapStateToProps)(MainHome);
