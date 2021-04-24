import React, { Component } from 'react';
import { Form, Checkbox, Tooltip, Icon } from 'antd';
import { formItemLayout } from 'src/view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import { FastField } from 'formik';

class CheckboxFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
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
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      );
    }
    return (
      <Form.Item
        {...layout}
        label={label}
        required={required}
        validateStatus={FormErrors.validateStatus(form, name, errorMessage)}
        help={FormErrors.displayableError(form, name, errorMessage) || hint}
        {...formItemProps}
      >
        <Checkbox
          id={name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          checked={!!form.values[name]}
          size={size || undefined}
          {...inputProps}
          suffix={suffix}
        />
      </Form.Item>
    );
  }
}

CheckboxFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  required: false,
};

CheckboxFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,

  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class CheckboxFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <CheckboxFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default CheckboxFormItem;
