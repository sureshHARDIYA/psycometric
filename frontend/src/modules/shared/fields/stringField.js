import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';

export default class StringField extends GenericField {
  constructor(
    name,
    label,
    {
      required = false,
      min = undefined,
      max = undefined,
      email = false,
      matches = undefined,
    } = {},
  ) {
    super(name, label);

    this.required = required;
    this.matches = matches;
    this.min = min;
    this.max = max;
    this.email = email;
  }

  forTable(overrides) {
    const defaultRender = undefined;

    const {
      title = this.label,
      sorter = true,
      dataIndex = this.name,
      render = defaultRender,
      ...others
    } = overrides || {};

    return {
      ...others,
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
    let yupChain = yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.email) {
      yupChain = yupChain.email();
    }

    if (this.matches) {
      yupChain = yupChain.matches(/^[0-9]/);
    }

    return yupChain;
  }

  forFilter() {
    return yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.email) {
      yupChain = yupChain.email();
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.matches) {
      yupChain = yupChain.matches(/^[0-9]/);
    }

    return yupChain;
  }
}
