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
import ListItemRate from '../../shared/list/listItemRate';
import Action from '../../../modules/candidat/candidatActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import i18n from '../../../i18n/index';
import Logo from 'assets/3DElements/cup.svg';
import ButtonLink from 'src/view/shared/styles/ButtonLink';

const { fields } = model;

class Skills extends Component {
  schema = new FormSchema(fields.id, [fields.skills]);
  constructor(props) {
    super(props);
    this.state = { skills: [] };
  }

  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteDictionary(value, 'SKL');
  };

  initialValues = () => {
    var { skills } = this.props;
    return this.schema.initialValues({ skills: skills });
  };
  HandleAddSkills = (item, skills) => {
    var { dispatch } = this.props;

    let index = skills.findIndex((element) => element.id === item.id);

    if (index == -1) {
      skills.push(item);
      this.setState({ skills: skills });
      return skills;
    }
    return skills;
  };

  HandleUpdateSkills = (data) => {
    var { dispatch } = this.props;
    dispatch(Action.DoUpdateSkillsCandidat(data.skills));
  };

  render() {
    var { loading } = this.props;

    return (
      <ViewMainProfileSetup
        Title={i18n.t('user.candidat.fields.skills')}
        Icon={
          <Logo
            height={plateform.normalize(60)}
            width={plateform.normalize(60)}
          />
        }
      >
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.HandleUpdateSkills(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            console.log(errors);
            return (
              <View style={{ width: '100%' }}>
                <AutocompleteItem
                  name={fields.skills.name}
                  placeholder={fields.skills.label}
                  value={values.skills}
                  Fetchfn={this.Fetchfn}
                  HandleUpdate={(data) => {
                    console.log(data);
                    setFieldValue(
                      fields.skills.name,
                      this.HandleAddSkills(data, values.skills),
                    );
                  }}
                />

                <View style={{}}>
                  <ListItemRate
                    name={fields.skills.name}
                    value={values.skills}
                    handlUpdate={(data) => {
                      setFieldValue(fields.skills.name, data);
                    }}
                    withRate={true}
                  />
                </View>

                <ButtonLink
                  scroll
                  bold
                  loading={loading}
                  handleSubmit={() => {
                    handleSubmit();
                  }}
                >
                  {i18n.t('common.save')}
                </ButtonLink>
              </View>
            );
          }}
        </Formik>
      </ViewMainProfileSetup>
    );
  }
}

const mapStateToProps = (state) => ({
  skills: selectors.selectSkills(state),
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(Skills);
