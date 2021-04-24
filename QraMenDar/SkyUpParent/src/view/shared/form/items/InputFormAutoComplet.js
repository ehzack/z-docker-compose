import React, { Component } from 'react';
import { Form, Select, Spin, Tooltip, Icon } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import debounce from 'lodash/debounce';

export class InputFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = async (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    const { fetchFn } = this.props;
    try {
      if (fetchId !== this.lastFetchId) {
        // for fetch callback order
        return;
      } else {
        let data = await fetchFn(value);

        this.setState({ data, fetching: false });
      }
    } catch (error) {}
  };

  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
      type,
      placeholder,
      autoFocus,
      autoComplete,
      prefix,
      formItemProps,
      inputProps,
      errorMessage,
      required,
      info,
    } = this.props;
    var suffix = null;
    if (info != undefined) {
      suffix = (
        <Tooltip title={info}>
          <Icon
            type="info-circle"
            style={{ color: 'rgba(0,0,0,.45)' }}
          />
        </Tooltip>
      );
    }
    return (
      <Form.Item
        {...layout}
        label={label}
        required={required}
        validateStatus={FormErrors.validateStatus(
          form,
          name,
          errorMessage,
        )}
        help={
          FormErrors.displayableError(
            form,
            name,
            errorMessage,
          ) || hint
        }
        {...formItemProps}
      >
        <Select
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Select Country or City"
          notFoundContent={
            fetching ? <Spin size="small" /> : null
          }
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          suffix={suffix}
          style={{ width: '100%' }}
        >
          {data.map((d) => (
            <Option key={d.id}>{d.value}</Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

InputFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  type: 'text',
  required: false,
};

InputFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class InputFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <InputFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default InputFormItem;
