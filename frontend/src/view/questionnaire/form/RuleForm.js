import { i18n } from 'i18n';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import model from 'modules/rule/model';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper from 'view/shared/styles/FormWrapper';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';

import {
  Button,
  Form,
} from 'antd';

const { fields } = model;

class RuleForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.id,
    fields.min,
    fields.max,
    fields.message,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    const { questionnaire } = this.props;

    const payload = {
      ...data,
      questionnaire,
    };

    this.props.onSubmit(id, payload);
  };

  initialValues = () => {
    const record = this.props.record || {};
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
                <InputNumberFormItem
                  name={fields.min.name}
                  label={fields.min.label}
                  placeholder="Numbers only!"
                  required={fields.min.required}
                />
                <InputNumberFormItem
                  name={fields.max.name}
                  label={fields.max.label}
                  placeholder="Numbers only!"
                  required={fields.max.required}
                />
                <TextAreaFormItem
                  name={fields.message.name}
                  label={fields.message.label}
                  required={fields.message.required}
                />
                <Form.Item
                  className="form-buttons ant-col-md-offset-6 ant-col-lg-offset-4"
                >
                  <Button
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

export default withRouter(RuleForm);
