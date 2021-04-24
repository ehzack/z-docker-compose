/* eslint-disable prettier/prettier */
import {getStore} from './../../../modules/store';
import config from './../../../config/index';
import {Platform} from 'react-native';
import i18n from '../../../i18n/index';
import UploadFile from '../../../modules/shared/upload/upload';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

var months = [
  i18n.t('shared.date.months.jan'),
  i18n.t('shared.date.months.feb'),
  i18n.t('shared.date.months.mar'),
  i18n.t('shared.date.months.apr'),
  i18n.t('shared.date.months.may'),
  i18n.t('shared.date.months.jun'),
  i18n.t('shared.date.months.jul'),
  i18n.t('shared.date.months.aug'),
  i18n.t('shared.date.months.sep'),
  i18n.t('shared.date.months.oct'),
  i18n.t('shared.date.months.nov'),
  i18n.t('shared.date.months.dec'),
];

var days = [
  i18n.t('shared.date.days.sunday'),
  i18n.t('shared.date.days.monday'),
  i18n.t('shared.date.days.tuesday'),
  i18n.t('shared.date.days.wednesday'),
  i18n.t('shared.date.days.thursday'),
  i18n.t('shared.date.days.friday'),
  i18n.t('shared.date.days.saturday'),
];

export default class FunctionsItem {
  static isToday = someDate => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  static isToWeek = someDate => {
    const today = new Date();

    var lastweek = new Date();
    lastweek.setDate(today.getDate() - 7);
    return (
      someDate.getDate() < today.getDate() &&
      someDate.getDate() > lastweek.getDate()
    );
  };
  static getTimeWithTimeZone(time) {
    console.log(getStore().getState().auth.currentUser.account_setting[0]);
    var timezone = getStore().getState().auth.currentUser.account_setting[0]
      .timezone.name;
    var newYork = moment.tz(time, timezone);
    return newYork.format();
  }

  static GetDateTime(DateItem) {
    let date = new Date(DateItem);
    if (this.isToday(date)) {
      return date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    } else {
      if (this.isToWeek(date)) {
        console.log(date.getDay());
        var day = days[date.getDay()];
        return `${day} ${date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}`;
      } else {
        return (
          date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
        );
      }
    }
  }

  static formatMessage = (item, userId, discussion) => {
    var msg;
    var date = new Date(item.created_at);
    var created_at_tz = moment
      .tz(new Date(date.getTime()), 'Africa/Casablanca')
      .format();
    if (item.sender_id == userId) {
      msg = {
        _id: Math.round(Math.random() * 1000000),
        text: item.content,
        createdAt: created_at_tz,
        user: {
          _id: userId,
        },
        read_at: item.read_at,
      };
    } else {
      msg = msg = {
        _id: Math.round(Math.random() * 1000000),
        text: item.content,
        createdAt: created_at_tz,
        user: {
          _id: 2,
          // avatar: UploadFile.getPath(discussion.avatar_recuiter).then(
          //   (data) => {
          //     return data;
          //   }
          // ),
        },
      };
    }
    return msg;
  };

  static prepareMessage = (messages, userId, discussion) => {
    var data = new Array();
    messages.map(item => {
      data.push(this.formatMessage(item, userId, discussion));
    });

    return data;
  };
}
