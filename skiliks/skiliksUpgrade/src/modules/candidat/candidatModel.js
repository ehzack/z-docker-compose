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
  return i18n.t(`user.candidat.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  skills: new JsonField('skills', label('skills'), { required: true }),
  study_level: new JsonField('study_level', label('study_level'), {
    required: true,
  }),
  availability: new StringField('availability', label('availability'), {
    required: true,
  }),
  salary: new StringArrayField('salary', label('salary'), {
    required: true,
  }),
  currency: new JsonField('currency', label('currency'), {
    required: true,
  }),
  localizations: new StringField('localizations', label('localizations'), {
    required: true,
  }),
  work_years_number: new JsonField(
    'work_years_number',
    label('work_years_number'),
    {
      required: true,
    },
  ),
  title: new StringField('title', label('title'), {
    required: true,
    max: 255,
  }),
  bio: new StringField('bio', label('bio'), { required: false }),

  contractType: new StringField('contractType', label('contractType')),
  languages: new StringField('languages', label('languages')),
};

export default {
  fields,
};
