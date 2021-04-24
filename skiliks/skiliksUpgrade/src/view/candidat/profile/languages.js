import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewMainProfileSetup from '../../shared/styles/ViewMain';
import plateform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/candidat/candidatSelectors';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AutocompleteItem from '../../shared/items/Autocomplete';
import { Formik } from 'formik';
import model from '../../../modules/candidat/candidatModel';
import FormSchema from '../../shared/form/formSchema';
import ItemRateFormItem from '../../shared/items/ItemRateFormItem';
import Action from '../../../modules/candidat/candidatActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import i18n, { setLanguageCode, getFlags } from '../../../i18n/index';
import ListItemRate from '../../shared/list/listItemRate';
import Logo from 'assets/3DElements/book.svg';
import ButtonLink from 'src/view/shared/styles/ButtonLink';

const { fields } = model;

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = { languages: [], listLanguages: [] };
  }
  componentDidMount() {
    var { languages, listLanguages } = this.props;
    this.setState({ languages: languages, listLanguages: listLanguages });
  }

  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteDictionary(value, 'LANG');
  };

  HandleAddLanguage = async (item) => {
    var { dispatch } = this.props;

    var languages = this.state.languages;
    let index = languages.findIndex((element) => element.id === item.id);
    console.log(item);
    if (index == -1) {
      languages.push(item);
      this.setState({ languages: languages });
    }
  };

  HandleUpdateLanguage = async (data) => {
    var { dispatch } = this.props;
    this.setState({ languages: data });
  };
  handleSubmit = () => {
    var { dispatch } = this.props;
    var { languages } = this.state;
    dispatch(Action.DoUpdateLanguagesCandidat(languages));
  };

  render() {
    var { languages, listLanguages } = this.state;
    var { loading } = this.props;

    return (
      <ViewMainProfileSetup
        Title={i18n.t('user.candidat.fields.languages')}
        Icon={
          <Logo
            height={plateform.normalize(60)}
            width={plateform.normalize(60)}
          />
        }
      >
        <AutocompleteItem
          name={fields.languages.name}
          placeholder={fields.languages.label}
          value={languages}
          Fetchfn={this.Fetchfn}
          HandleUpdate={this.HandleAddLanguage}
        />

        <View style={{}}>
          <ListItemRate
            name={fields.languages.name}
            value={languages}
            handlUpdate={this.HandleUpdateLanguage}
            withRate={true}
            isLanguage={true}
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
  languages: selectors.selectLanguages(state),
  listLanguages: selectors.selectListLanguages(state),
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(Languages);
