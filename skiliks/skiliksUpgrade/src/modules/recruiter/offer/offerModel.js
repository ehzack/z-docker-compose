import i18n from '../../../i18n/index';
import StringField from '../../shared/fields/stringField';
import IdField from '../../shared/fields/idField';

import DecimalField from '../../shared/fields/decimalField';
import ImagesField from '../../shared/fields/imagesField';
import EnumeratorField from '../../shared/fields/enumeratorField';
import JsonField from '../../shared/fields/jsonField';

function label(name) {
  return i18n.t(`user.recruiter.offer.fields.${name}`);
}
function enumeratorLabel(name, value) {
  return i18n.t(`user.recruiter.offer.fields.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),

  company_logo: new ImagesField(
    'company_logo',
    label('company_logo'),
    `offer/avatars/`,
    { max: 1, size: 5 },
  ),
  description: new StringField('description', label('description'), {
    required: false,
  }),
  study_level: new JsonField('study_level', label('study_level'), {
    required: true,
  }),
  localizations: new JsonField('localizations', label('localizations'), {
    required: true,
  }),

  work_years_experience: new JsonField(
    'work_years_experience',
    label('work_years_experience'),
    {
      required: true,
    },
  ),
  required_skills: new JsonField('required_skills', label('required_skills'), {
    required: true,
  }),
  preferred_skills: new JsonField(
    'preferred_skills',
    label('preferred_skills'),
    {
      required: true,
    },
  ),
  availability: new JsonField('availability', label('availability'), {
    required: true,
  }),
  contract_types: new JsonField('contract_types', label('contract_types'), {
    required: true,
  }),

  company_name: new StringField('company_name', label('company_name'), {
    required: true,
  }),
  gender: new EnumeratorField(
    'gender',
    label('gender'),
    [
      { id: 0, value: 'both', label: enumeratorLabel('gender', 'both') },
      { id: 1, value: 'male', label: enumeratorLabel('gender', 'male') },
      { id: 2, value: 'female', label: enumeratorLabel('gender', 'female') },
    ],
    {
      required: true,
    },
  ),

  languages: new JsonField('languages', label('languages'), {
    required: true,
  }),
  status: new StringField('status', label('status'), {
    required: true,
  }),
};

export default {
  fields,
};
