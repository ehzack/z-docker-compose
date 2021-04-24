import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import { Button } from 'native-base';
import platform from '../../../../native-base-theme/variables/platform';
import UploadFile from '../../../modules/shared/upload/upload';
import LeftIcon from '../../../../assets/icons/navigation/left.svg';
import OptionIcon from '../../../../assets/icons/popular/option.svg';
import model from '../../../modules/recruiter/offer/offerModel';
import Close from '../../../../assets/icons/popular/closeBlack.svg';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import services from '../../../modules/recruiter/offer/offerServices';
import action from '../../../modules/recruiter/offer/offerActions';

export default class OptionCard extends Component {
  _menu = null;

  constructor(props) {
    super(props);
  }

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    var { showOption } = this.props;
    this._menu.hide();
    showOption(false);
  };

  showMenu = () => {
    var { showOption } = this.props;
    this._menu.show();
    showOption(true);
  };
  draftPubAdd = (flag) => {
    console.log(flag);
    var { id } = this.props.item;
    services.change_status_ads(id, flag ? 'PUB' : 'DRA');
    this.hideMenu();
  };
  archiveAdd = () => {
    var { id } = this.props.item;
    services.change_status_ads(id, 'ARC');
    this.hideMenu();
  };
  handleEdit = () => {
    var { item, dispatch } = this.props;
    this.hideMenu();

    dispatch(action.navigateToUpdate(item));
  };
  render() {
    var { item, index, showOption, flagShowOption, showCandidat } = this.props;

    return (
      <Menu
        ref={this.setMenuRef}
        button={
          <TouchableOpacity
            onPress={this.showMenu}
            style={{
              height: '100%',
              width: platform.getRelativeWidth(50),
              alignItems: 'flex-end',
              paddingLeft: platform.getRelativeWidth(10),
              paddingRight: platform.getRelativeWidth(10),
            }}
          >
            <OptionIcon />
          </TouchableOpacity>
        }
        style={[
          {
            width: '40%',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            flexDirection: 'column',

            borderRadius: 15,
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
                height: -10,
              },
              shadowOpacity: 1,
              shadowRadius: 1,

              elevation: 3,
            },
          }),
        ]}
      >
        <MenuItem
          onPress={() => {
            showOption(false);
          }}
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: platform.getRelativeWidth(25),
          }}
        >
          <Close fill="red" />
        </MenuItem>

        <MenuItem
          style={{
            height: platform.getRelativeHeight(35),

            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('Click Me');
            showCandidat();
            this.hideMenu();
          }}
        >
          Candidat list
        </MenuItem>
        <MenuDivider />
        <TouchableOpacity
          style={{
            height: platform.getRelativeHeight(35),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: 248,
            minWidth: 124,
          }}
          //disabled={item.status_code == "PUB" || item.status_code == "DRA"}
        >
          <Text>Enable</Text>

          <Switch
            trackColor={{ false: '#EFF1F6', true: platform.brandPrimary }}
            thumbColor={platform.brandPrimary}
            value={item.status_code == 'PUB' ? true : false}
            style={{
              width: platform.getRelativeWidth(51),
              height: platform.getRelativeHeight(30),
            }}
            onValueChange={this.draftPubAdd}
          />
        </TouchableOpacity>

        <MenuDivider />
        <MenuItem
          style={{
            height: platform.getRelativeHeight(35),

            justifyContent: 'center',
          }}
          onPress={() => {
            this.handleEdit();
          }}
        >
          Edit
        </MenuItem>

        <MenuDivider />

        <MenuItem
          disabled={item.status_code == 'ARC' ? true : false}
          style={{
            height: platform.getRelativeHeight(35),

            justifyContent: 'center',
          }}
          onPress={() => {
            this.archiveAdd();
          }}
        >
          Archive
        </MenuItem>
        <MenuDivider />

        <MenuItem
          disabled={true}
          style={{
            height: platform.getRelativeHeight(35),

            justifyContent: 'center',
          }}
          onPress={() => {
            showCandidat();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    );
  }
}
