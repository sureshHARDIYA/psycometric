import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import model from 'modules/auth/userModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';

const { fields } = model;

class ProfileFormPage extends Component {
  state = {
    password: false,
  };

  schema = new FormSchema(fields.id, [
    fields.email,
    fields.firstName,
    fields.lastName,
    fields.avatarsProfile,
    fields.roles,
    fields.password,
    fields.newPassword,
  ]);

  schemaNoPassword = new FormSchema(fields.id, [
    fields.email,
    fields.firstName,
    fields.lastName,
    fields.avatarsProfile,
    fields.roles,
  ]);

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doUpdateProfile(
        values.firstName,
        values.lastName,
        values.avatars,
        this.state.password && values.password,
        this.state.password && values.newPassword,
      ),
    );
  };

  initialValues = () => {
    const currentUser = this.props.currentUser;
    return this.schema.initialValues(currentUser);
  };

  renderForm() {
    const { password } = this.state;
    const { saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={
            password
              ? this.schema.schema
              : this.schemaNoPassword.schema
          }
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <ViewFormItem
                  name={fields.email.name}
                  label={fields.email.label}
                />

                <InputFormItem
                  name={fields.firstName.name}
                  label={fields.firstName.label}
                  autoComplete={fields.firstName.name}
                  autoFocus
                />

                <InputFormItem
                  name={fields.lastName.name}
                  label={fields.lastName.label}
                  autoComplete={fields.lastName.name}
                />

                <ImagesFormItem
                  name={fields.avatarsProfile.name}
                  label={fields.avatarsProfile.label}
                  path={fields.avatarsProfile.path(
                    this.props.currentUser
                      .authenticationUid,
                  )}
                  schema={{
                    size: fields.avatarsProfile.size,
                  }}
                  max={fields.avatarsProfile.max}
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    disabled={saveLoading}
                    onClick={() =>
                      this.setState({ password: !password })
                    }
                  >
                    {password
                      ? i18n('auth.changepassword.hide')
                      : i18n('auth.changepassword.add')}
                  </Button>
                </Form.Item>

                {password && (
                  <>
                    <InputFormItem
                      type="password"
                      name={fields.password.name}
                      label={fields.password.label}
                      required={fields.password.required}
                    />
                    <InputFormItem
                      type="password"
                      name={fields.newPassword.name}
                      label={fields.newPassword.label}
                      required={fields.newPassword.required}
                    />
                  </>
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
    return this.renderForm();
  }
}

function select(state) {
  return {
    saveLoading: selectors.selectLoadingUpdateProfile(
      state,
    ),
    currentUser: selectors.selectCurrentUser(state),
  };
}

export default connect(select)(ProfileFormPage);
