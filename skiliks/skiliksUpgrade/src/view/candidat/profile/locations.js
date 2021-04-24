import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewMainProfileSetup from '../../shared/styles/ViewMain';
import plateform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/candidat/candidatSelectors';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Autocomplete from '../../shared/items/Autocomplete';
import { Formik } from 'formik';
import model from '../../../modules/candidat/candidatModel';
import FormSchema from '../../shared/form/formSchema';
import ListItemRate from '../../shared/list/listItemRate';
import Action from '../../../modules/candidat/candidatActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import i18n from '../../../i18n/index';
import Logo from 'assets/3DElements/compass.svg';
import ButtonLink from 'src/view/shared/styles/ButtonLink';

const { fields } = model;

class Locations extends Component {
  schema = new FormSchema(fields.id, [fields.localizations]);
  constructor(props) {
    super(props);
    this.state = { action: 0, localizations: [] };
  }

  componentWillMount() {
    var localizations = this.props.localizations;
    this.setState({ localizations: localizations });
  }
  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteGeo(value);
  };

  HandleAddLocalization = async (item) => {
    var { dispatch } = this.props;
    var localizations = this.state.localizations;
    let index = localizations.findIndex(
      (element) => element.label === item.label,
    );

    if (index == -1) {
      var data = await DictionaryServices.SaveGeo(item.label);
      localizations.push(data);
      this.setState({ localizations: localizations });
    }
  };

  HandleUpdateLocalization = async (data) => {
    this.setState({ localizations: data });
  };
  handleSubmit = () => {
    var { dispatch } = this.props;

    var { localizations } = this.state;
    dispatch(Action.DoUpdateLocalizationsCandidat(localizations));
  };
  render() {
    var { localizations } = this.state;
    var { loading } = this.props;
    return (
      <ViewMainProfileSetup
        Title={i18n.t('user.candidat.fields.jobs')}
        Icon={
          <Logo
            height={plateform.normalize(60)}
            width={plateform.normalize(60)}
          />
        }
      >
        <View style={{}}>
          <Autocomplete
            name={fields.localizations.name}
            placeholder={fields.localizations.label}
            value={localizations || []}
            Fetchfn={this.Fetchfn}
            HandleUpdate={this.HandleAddLocalization}
            action={this.state.action}
          />
        </View>

        <View style={{}}>
          <ListItemRate
            name={fields.localizations.name}
            value={localizations || []}
            handlUpdate={this.HandleUpdateLocalization}
            action={this.state.action}
            withRate={false}
          />
        </View>
        <ButtonLink
          scroll
          bold
          loading={loading}
          handleSubmit={() => {
            this.handleSubmit();
          }}
        >
          {i18n.t('common.save')}
        </ButtonLink>
      </ViewMainProfileSetup>
    );
  }
}

const mapStateToProps = (state) => ({
  localizations: selectors.selectLocalizations(state),
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(Locations);
