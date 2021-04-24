import GenericField from 'src/modules/shared/fields/genericField';
import * as yup from 'yup';

export default class JsonField extends GenericField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);

    this.required = required;
  }
  forTable(overrides) {
    const defaultRender = undefined;

    const {
      title = this.label,
      sorter = false,
      dataIndex = this.name,
      render = defaultRender,
    } = overrides || {};

    return {
      title,
      sorter,
      dataIndex,
      render,
    };
  }

  forView(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forForm() {
    let yupChain = yup.mixed().label(this.label);
    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }

  forFilter() {
    let yupChain = yup.mixed().label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }
    return yupChain;
  }

  forExport() {
    let yupChain = yup
      .mixed()
      .label(this.label)
      .transform((value, originalValue) => {
        return JSON.stringify(originalValue, null, 2);
      });
    return yupChain;
  }

  forImport() {
    let yupChain = yup.mixed().label(this.label);
    return yupChain;
  }
}
