import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/feedback/form/feedbackFormActions';
import model from 'modules/feedback/feedbackModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import SigninPageWrapper from 'view/auth/styles/SigninPageWrapper';
import { InputFormItemNotFast } from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';

const { fields } = model;

class FeedbackFromPage extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.message,
  ]);

  doSubmit = (data) => {
    const { dispatch } = this.props;
    dispatch(actions.doCreate(data));
  };

  render() {
    return (
      <SigninPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <Formik
            validationSchema={this.schema.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <Form onSubmit={form.handleSubmit}>
                <InputFormItemNotFast
                  name={fields.email.name}
                  placeholder={fields.email.label}
                  autoComplete={fields.email.name}
                  size="large"
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  layout={null}
                  form={form}
                />

                <TextAreaFormItem
                  name={fields.message.name}
                  placeholder={fields.message.label}
                  autoComplete={fields.message.name}
                  size="large"
                  layout={null}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  {i18n('common.send')}
                </Button>

                <OtherActions>
                  <Link to="/auth/signin">
                    {i18n('auth.alreadyHaveAnAccount')}
                  </Link>
                </OtherActions>
              </Form>
            )}
          />
        </Content>
      </SigninPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(select)(FeedbackFromPage);
