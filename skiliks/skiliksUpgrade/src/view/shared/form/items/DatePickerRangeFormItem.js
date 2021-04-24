import React, { Component } from 'react';
import { Form, DatePicker, Tooltip, Icon } from 'antd';
import { formItemLayout } from 'src/view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import { FastField } from 'formik';

class DatePickerRangeFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      autoFocus,
      showTime,
      formItemProps,
      inputProps,
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
        validateStatus={FormErrors.validateStatus(form, name)}
        help={FormErrors.displayableError(form, name) || hint}
        required={required}
        {...formItemProps}
      >
        <DatePicker.RangePicker
          id={name}
          onChange={(value) => form.setFieldValue(name, value)}
          value={form.values[name]}
          autoFocus={autoFocus || false}
          style={{ width: '100%' }}
          showTime={showTime ? { format: 'HH:mm' } : undefined}
          format={showTime ? 'YYYY-MM-DD HH:mm' : undefined}
          {...inputProps}
          suffix={suffix}
        />
      </Form.Item>
    );
  }
}

DatePickerRangeFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  showTime: false,
};

DatePickerRangeFormItemNotFast.propTypes = {
  showTime: PropTypes.bool,
  required: PropTypes.bool,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  layout: PropTypes.object,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class DatePickerRangeFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <DatePickerRangeFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default DatePickerRangeFormItem;
