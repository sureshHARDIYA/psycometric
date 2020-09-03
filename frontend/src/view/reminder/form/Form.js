import { i18n } from 'i18n';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import FormSchema from 'view/shared/form/formSchema';
import model from 'modules/reminder/model';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import RadioFormItem from 'view/shared/form/items/RadioFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import UserAutocompleteFormItem from 'view/iam/autocomplete/UserAutocompleteFormItem';
import QuestionnaireAutocompleteFormItem from 'view/questionnaire/autocomplete/QuestionnaireAutocompleteFormItem';

const { fields } = model;

class ReminderForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.title,
    fields.message,
    fields.schedule,
    fields.frequency,
    fields.audience,
    fields.questionnaire,
    fields.test,
    fields.audienceList,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record || {};

    if (!record.audience) {
      record.audience = "ALL"
    }

    if (!record.frequency) {
      record.frequency = "WEEKLY"
    }

    if (record.audienceList) {
      record.audienceList = record.audienceList.filter(Boolean)
    }

    return this.schema.initialValues(record);
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}
                <InputFormItem
                  name={fields.title.name}
                  label={fields.title.label}
                  required={fields.title.required}
                  autoFocus
                />
                <TextAreaFormItem
                  name={fields.message.name}
                  label={fields.message.label}
                  required={fields.message.required}
                />
                <DatePickerFormItem
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  name={fields.schedule.name}
                  label={fields.schedule.label}
                  required={fields.schedule.required}
                />
                <RadioFormItem
                  name={fields.test.name}
                  label={fields.test.label}
                  options={fields.test.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.test.required}
                />
                <QuestionnaireAutocompleteFormItem
                  name={fields.questionnaire.name}
                  label={fields.questionnaire.label}
                  required={fields.questionnaire.required}
                  form={form}
                />
                <RadioFormItem
                  name={fields.frequency.name}
                  label={fields.frequency.label}
                  options={fields.frequency.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.frequency.required}
                />
                <RadioFormItem
                  name={fields.audience.name}
                  label={fields.audience.label}
                  options={fields.audience.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.audience.required}
                />
                {form.values.audience === 'USER' && (
                  <UserAutocompleteFormItem
                    form={form}
                    mode="multiple"
                    name={fields.audienceList.name}
                    label={fields.audienceList.label}
                    required={fields.audienceList.required}
                  />
                )}
                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default ReminderForm;
