import { i18n } from 'i18n';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import { connect } from 'react-redux';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import model from 'modules/auth/userModel';
import actions from 'modules/iam/form/iamFormActions';
import selectors from 'modules/iam/form/iamFormSelectors';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormSchema from 'view/shared/form/formSchema';
import CheckboxFormItem from 'view/shared/form/items/CheckboxFormItem';

const { fields } = model;

class IamEditForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.firstName,
    fields.lastName,
    fields.phoneNumber,
    fields.avatarsIam,
    fields.roles,
    fields.settings,
    fields.intrestedCategories,
  ]);

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  handleSubmit = (values) => {
    const { dispatch, user } = this.props;
    const data = {
      id: user.id,
      ...this.schema.cast(values),
    };
    delete data.email;
    dispatch(actions.doUpdate(data));
  };

  initialValues = () => {
    const user = this.props.user;
    return this.schema.initialValues(user);
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <ViewFormItem
                  name={fields.id.name}
                  label={fields.id.label}
                />

                <ViewFormItem
                  name={fields.email.name}
                  label={fields.email.label}
                />

                <InputFormItem
                  name={fields.firstName.name}
                  label={fields.firstName.label}
                  autoFocus
                />

                <InputFormItem
                  name={fields.lastName.name}
                  label={fields.lastName.label}
                  autoComplete={fields.lastName.name}
                />

                <InputFormItem
                  name={fields.phoneNumber.name}
                  label={fields.phoneNumber.label}
                  autoComplete={fields.phoneNumber.name}
                  prefix={'+'}
                />

                <ImagesFormItem
                  name={fields.avatarsIam.name}
                  label={fields.avatarsIam.label}
                  path={fields.avatarsIam.path}
                  width={fields.avatarsIam.width}
                  height={fields.avatarsIam.height}
                  schema={{
                    size: fields.avatarsIam.size,
                  }}
                  max={fields.avatarsIam.max}
                />
                <SelectFormItem
                  name={fields.roles.name}
                  label={fields.roles.label}
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

  render() {
    const { findLoading, user } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (!user) {
      return null;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    user: selectors.selectUser(state),
  };
}

export default connect(select)(IamEditForm);
