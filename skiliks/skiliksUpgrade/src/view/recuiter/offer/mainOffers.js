import React, { Component } from 'react';
import { View, Text, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import ViewMain from '../../shared/styles/ViewMain';
import platform from '../../../../native-base-theme/variables/platform';
import ListeOffers from './listeOffers';
import { connect } from 'react-redux';
import i18n from '../../../i18n/index';
import LightningSVG from 'assets/3DElements/lightning.svg';
class MainOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    var { dispatch } = this.props;
    var { index } = this.state;
    return (
      <ViewMain
        Icon={
          <LightningSVG
            style={{
              width: platform.normalize(15),
              height: platform.normalize(15),
            }}
          />
        }
        Title={i18n.t('user.recruiter.menu.preferences.myJobOffers')}
      >
        <Tabs
          onChangeTab={(a) => this.setState({ index: a['i'] })}
          style={{ backgroundColor: '#FAFBFD' }}
          renderTabBar={() => (
            <ScrollableTab
              style={{ backgroundColor: 'transparent' }}
              underlineStyle={{
                borderRadius: 25,
                borderWidth: 2,
                borderColor: platform.brandPrimary,
              }}
              tabsContainerStyle={{
                width: platform.getResponsiveWidth(90),
              }}
            />
          )}
        >
          <Tab
            tabStyle={{ backgroundColor: 'red' }}
            heading={
              <TabHeading>
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(13),
                    color: platform.brandPrimary,
                    opacity: index == 0 ? 1 : 0.3,
                  }}
                >
                  {i18n.t(`user.recruiter.offer.status.PUB`)}
                </Text>
              </TabHeading>
            }
          >
            <ListeOffers status="PUB" dispatch={dispatch} />
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: '#FAFBFD' }}
            heading={
              <TabHeading>
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(13),
                    color: platform.brandPrimary,
                    opacity: index == 1 ? 1 : 0.3,
                  }}
                >
                  {i18n.t(`user.recruiter.offer.status.DRA`)}
                </Text>
              </TabHeading>
            }
          >
            <ListeOffers status="DRA" dispatch={dispatch} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platform.normalize(13),
                    color: platform.brandPrimary,
                    opacity: index == 2 ? 1 : 0.3,
                  }}
                >
                  {i18n.t(`user.recruiter.offer.status.CLO`)}
                </Text>
              </TabHeading>
            }
          >
            <ListeOffers status="ARC" dispatch={dispatch} />
          </Tab>
        </Tabs>
      </ViewMain>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MainOffers);
