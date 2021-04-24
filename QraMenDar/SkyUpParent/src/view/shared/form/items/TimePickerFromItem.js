import React, { Component } from 'react';
import { Form, TimePicker, Tooltip, Icon } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class TimePickerFormItemNotFast extends Component {
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
                )}
                help={
                    FormErrors.displayableError(form, name) || hint
                }
                {...formItemProps}
            >
                <TimePicker
                    id={name}
                    onChange={(value) =>
                        form.setFieldValue(name, value)
                    }
                    value={form.values[name]}
                    autoFocus={autoFocus || false}
                    style={{ width: '100%' }}
                    {...inputProps}
                    suffix={suffix}
                />
            </Form.Item>
        );
    }
}

TimePickerFormItemNotFast.defaultProps = {
    layout: formItemLayout,
    showTime: false,
    required: false,
};

TimePickerFormItemNotFast.propTypes = {
    showTime: PropTypes.bool,
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    layout: PropTypes.object,
    formItemProps: PropTypes.object,
    inputProps: PropTypes.object,
    required: PropTypes.bool,
};

class TimePickerFormItem extends Component {
    render() {
        return (
            <FastField
                name={this.props.name}
                render={({ form }) => (
                    <TimePickerFormItemNotFast
                        {...this.props}
                        form={form}
                    />
                )}
            />
        );
    }
}

export default TimePickerFormItem;