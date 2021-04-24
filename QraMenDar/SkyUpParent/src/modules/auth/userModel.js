import i18n from "../../i18n/index";
import StringField from "../shared/fields/stringField";
import IdField from "../shared/fields/idField";
import DateTimeField from "../shared/fields/dateTimeField";
import DateTimeRangeField from "../shared/fields/dateTimeRangeField";
import ImagesField from "../shared/fields/imagesField";
import BooleanField from "../shared/fields/booleanField";
import StringArrayField from "../shared/fields/stringArrayField";
import GenericField from "../shared/fields/genericField";
import * as yup from "yup";
import Roles from "../../sercurity/roles";
import EnumeratorField from "../shared/fields/enumeratorField";

class RolesField extends StringArrayField {
  constructor(name, label, config) {
    super(name, label, config);

    this.options = Roles.selectOptions;
  }

  forExport() {
    return yup
      .mixed()
      .label(this.label)
      .transform((values) =>
        values ? values.map((value) => Roles.labelOf(value)).join(" ") : null
      );
  }
}

class EmailsField extends StringArrayField {
  forFormInitialValue(value) {
    return value;
  }

  forForm() {
    let yupChain = yup
      .string()
      .email(i18n.t("auth.validations.email"))
      .label(i18n.t("user.fields.email"))
      .max(255)
      .required();

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}
class PasswordValideField extends StringArrayField {
  forFormInitialValue(value) {
    return value;
  }

  forForm() {
    let yupChain = yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          i18n.t("auth.passwordReset.errorIdentical")
        ),
    });

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}

function label(name) {
  return i18n.t(`user.fields.${name}`);
}

const fields = {
  id: new IdField("id", label("id")),
  first_name: new StringField("first_name", label("first_name"), {
    max: 80,
    required: true,
  }),
  authenticationUid: new StringField(
    "authenticationUid",
    label("authenticationUid")
  ),
  last_name: new StringField("last_name", label("last_name"), {
    max: 175,
    required: true,
  }),
  oldpassword: new StringField("oldpassword", label("password"), {
    required: true,
  }),

  password: new StringField("password", label("password"), {
    required: true,
  }),
  confirmPassword: new PasswordValideField(
    "confirmPassword",
    label("confirmPassword"),
    {
      required: true,
    }
  ),
  currentPassword: new StringField(
    "currentPassword",
    label("currentPassword"),
    {
      required: true,
    }
  ),

  language: new StringField("language", label("language")),
  timezone: new StringField("timezone", label("timezone")),

  username: new StringField("username", label("username"), {
    required: true,
    max: 255,
  }),

  email: new EmailsField("email", label("email"), {
    required: true,
  }),
  gender: new EnumeratorField(
    "gender",
    label("genderTitle"),
    [
      { id: "male", value: "male", label: i18n.t("user.fields.gender.male") },
      {
        id: "female",
        value: "female",
        label: i18n.t("user.fields.gender.female"),
      },
    ],
    {
      required: true,
    }
  ),
  role: new EnumeratorField("role", label("role"), Roles.selectOptions),
  rememberMe: new BooleanField("rememberMe", label("rememberMe")),
  disabledAsStatus: new BooleanField("disabled", label("status"), {
    noLabel: i18n.t("user.enabled"),
    yesLabel: i18n.t("user.disabled"),
  }),
  disabled: new BooleanField("disabled", label("disabled"), {
    noLabel: i18n.t("user.enabled"),
    yesLabel: i18n.t("user.disabled"),
  }),
  phoneNumber: new StringField("phoneNumber", label("phoneNumber"), {
    // matches: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    // max: 24,
    required: true,
  }),

  area_code: new StringField("area_code", label("area_code"), {
    required: true,
    default: "ma",
  }),

  avatar_profile: new ImagesField(
    "avatar_profile",
    label("avatars_url"),
    `user/avatars/profile/`,
    { max: 1, size: 5 }
  ),

  rolesRequired: new RolesField("roles", label("roles"), {
    required: true,
  }),
  roles: new RolesField("roles", label("roles")),
  created_at: new DateTimeField("created_at", label("created_at")),
  updatedAt: new DateTimeField("updatedAt", label("updatedAt")),
  createdAtRange: new DateTimeRangeField(
    "createdAtRange",
    label("createdAtRange")
  ),
  roleUser: new GenericField("roleUser", label("roleUser")),
  status: new EnumeratorField("status", label("status"), [
    {
      id: "enabled",
      label: i18n.t("user.enabled"),
    },
    {
      id: "disabled",
      label: i18n.t("user.disabled"),
    },
  ]),
};

export default {
  fields,
};
