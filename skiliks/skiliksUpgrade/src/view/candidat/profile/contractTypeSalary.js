import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewMainProfileSetup from '../../shared/styles/ViewMain';
import plateform from '../../../../native-base-theme/variables/platform';
import { Content } from 'native-base';

import { connect } from 'react-redux';
import selectors from '../../../modules/candidat/candidatSelectors';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ItemFormItem from '../../shared/items/ItemFormItem';
import { Formik } from 'formik';
import model from '../../../modules/candidat/candidatModel';
import FormSchema from '../../shared/form/formSchema';
import Action from '../../../modules/candidat/candidatActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import i18n from '../../../i18n/index';
import Logo from 'assets/3DElements/coins2.svg';
import SlideFormItem from 'src/view/shared/items/slide/SlideItemForm';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
const { fields } = model;

class ContractTypeSalary extends Component {
  schema = new FormSchema(fields.id, [fields.contractType, fields.salary]);
  constructor(props) {
    super(props);
    this.state = { action: 0, listContractType: [], contractType: [] };
  }

  initialValues = () => {
    var { contractType, listContractType, salary } = this.props;

    return this.schema.initialValues({ contractType: contractType, salary });
  };

  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteGeo(value);
  };

  HandleFormater = (data, contractType) => {
    let payload = contractType;
    let index = payload.findIndex((element) => element.id === data.id);
    if (index == -1) {
      payload.push(data);
      // this.setState({ contractType: payload });
      // await dispatch(Action.DoUpdateContractTypeCandidat(payload));
      return payload;
    } else {
      var filtred = payload.filter((element) => {
        return element.id != data.id;
      });
      return filtred;
      // this.setState({ contractType: filtred });

      // await dispatch(Action.DoUpdateContractTypeCandidat(filtred));
    }
  };

  HandleUpdate = (data) => {
    console.log(data);
    var { dispatch } = this.props;
    dispatch(Action.DoUpdateContractTypeSalaryCandidat(data));
  };

  render() {
    var { contractType, listContractType, loading } = this.props;

    return (
      <ViewMainProfileSetup
        Title={
          i18n.t('user.candidat.fields.jobs') +
          ' & ' +
          i18n.t('user.candidat.fields.salary')
        }
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
          onSubmit={(values) => this.HandleUpdate(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            console.log(values);
            return (
              <View>
                <View
                  style={{
                    paddingTop: plateform.getResponsiveHeight(1),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Calibri',
                      fontSize: plateform.normalize(15),
                      color: '#898989',
                    }}
                  >
                    {i18n.t('user.candidat.fields.salary')}
                  </Text>
                </View>
                <SlideFormItem
                  value={values[fields.salary.name]}
                  scroll
                  handleChange={(data) => {
                    setFieldValue(fields.salary.name, data);
                  }}
                />

                <View
                  style={{
                    paddingTop: plateform.getResponsiveHeight(4),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Calibri',
                      fontSize: plateform.normalize(15),
                      color: '#898989',
                    }}
                  >
                    {i18n.t('user.candidat.fields.contractType')}
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: plateform.getResponsiveHeight(2),
                    paddingBottom: plateform.getResponsiveHeight(5),
                  }}
                >
                  {listContractType.map((e, index) => (
                    <ItemFormItem
                      value={e}
                      HandlePress={() => {
                        setFieldValue(
                          fields.contractType.name,
                          this.HandleFormater(e, values.contractType),
                        );
                      }}
                      index={index}
                      checkbox={true}
                      checked={
                        values[fields.contractType.name].findIndex(
                          (element) => element.id === e.id,
                        ) == -1
                          ? false
                          : true
                      }
                    />
                  ))}
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
  contractType: selectors.selectContractType(state),
  listContractType: selectors.selectListContractType(state),
  salary: selectors.selectSalary(state),
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(ContractTypeSalary);
