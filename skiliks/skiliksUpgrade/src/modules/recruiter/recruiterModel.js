import i18n from '../../i18n/index';
import StringField from '../shared/fields/stringField';
import IdField from '../shared/fields/idField';
import DateTimeField from '../shared/fields/dateTimeField';
import DateTimeRangeField from '../shared/fields/dateTimeRangeField';
import ImagesField from '../shared/fields/imagesField';
import DecimalField from '../shared/fields/decimalField';

import BooleanField from '../shared/fields/booleanField';
import StringArrayField from '../shared/fields/stringArrayField';
import GenericField from '../shared/fields/genericField';
import * as yup from 'yup';
import Roles from '../../sercurity/roles';
import EnumeratorField from '../shared/fields/enumeratorField';
import JsonField from '../shared/fields/jsonField';

function label(name) {
  return i18n.t(`user.recruiter.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  company_name: new StringField('company_name', label('company_name'), {
    required: true,
  }),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  expertises: new JsonField('expertises', label('expertises'), {
    required: true,
  }),
};

export default {
  fields,
};
