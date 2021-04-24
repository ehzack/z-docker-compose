import GenericField from './genericField';
import * as yup from 'yup';

export default class DateTimeRangeField extends GenericField {
  forFilter() {
    return yup.mixed().label(this.label);
  }
}
