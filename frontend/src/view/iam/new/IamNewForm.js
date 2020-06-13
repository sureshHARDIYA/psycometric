import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TagsFormItem from 'view/shared/form/items/TagsFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import CheckboxFormItem from 'view/shared/form/items/CheckboxFormItem';

const { fields } = model;

const singleSchema = new FormSchema(fields.id, [
  fields.email,
  fields.firstName,
  fields.lastName,
  fields.avatarsIam,
  fields.rolesRequired,
  fields.postStatus,
  fields.settings,
]);

const multipleSchema = new FormSchema(fields.id, [
  fields.emails,
  fields.firstName,
  fields.lastName,
  fields.avatarsIam,
  fields.rolesRequired,
  fields.postStatus,
]);

class IamNewForm extends Component {
  schema = () => {
    return this.props.single
      ? singleSchema
      : multipleSchema;
  };

  handleSubmit = (values) => {
    const { id, ...data } = this.schema().cast(values);

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    return this.schema().initialValues({});
  };

  isSingleEmail(form) {
    return (
      !form.values ||
      !form.values.emails ||
      form.values.emails.length <= 1
    );
  }

  render() {
    const { single, saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.schema().initialValues()}
          validationSchema={this.schema().schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {single ? (
                  <InputFormItem
                    name={fields.email.name}
                    label={fields.email.label}
                    required={fields.email.required}
                    autoFocus
                  />
                ) : (
                  <TagsFormItem
                    name={fields.emails.name}
                    label={fields.emails.label}
                    notFoundContent={i18n(
                      'iam.new.emailsHint',
                    )}
                    required={fields.emails.required}
                    autoFocus
                  />
                )}

                {this.isSingleEmail(form) && (
                  <React.Fragment>
                    <InputFormItem
                      name={fields.firstName.name}
                      label={fields.firstName.label}
                    />

                    <InputFormItem
                      name={fields.lastName.name}
                      label={fields.lastName.label}
                    />

                    <ImagesFormItem
                      name={fields.avatarsIam.name}
                      label={fields.avatarsIam.label}
                      path={fields.avatarsIam.path}
                      schema={{
                        size: fields.avatarsIam.size,
                      }}
                      max={fields.avatarsIam.max}
                    />
                    <TextAreaFormItem
                      name={fields.postStatus.name}
                      label={fields.postStatus.label}
                      required={fields.postStatus.required}
                    />
                  </React.Fragment>
                )}

                <SelectFormItem
                  name={fields.rolesRequired.name}
                  label={fields.rolesRequired.label}
                  required={fields.rolesRequired.required}
                  options={fields.roles.options}
                  mode="multiple"
                />
                {fields.settings.fields && (
                  <div>
                    <CheckboxFormItem
                      name={
                        fields.settings.fields
                          .newQuestionnaireAlert.name
                      }
                      label={
                        fields.settings.fields
                          .newQuestionnaireAlert.label
                      }
                    />

                    <CheckboxFormItem
                      name={
                        fields.settings.fields
                          .remindersAlert.name
                      }
                      label={
                        fields.settings.fields
                          .remindersAlert.label
                      }
                    />
                  </div>
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
}

export default IamNewForm;
