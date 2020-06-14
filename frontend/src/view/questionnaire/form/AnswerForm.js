import { i18n } from 'i18n';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import model from 'modules/answer/model';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper from 'view/shared/styles/FormWrapper';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';

import {
  Button,
  Form,
} from 'antd';

const { fields } = model;

class AnswerForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.id,
    fields.title,
    fields.score,
    fields.type
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    const { questionnaire } = this.props;

    const payload = {
      ...data,
      questionnaire,
    };

    if (!payload.type) {
      payload.type = "TEXT"
    }

    this.props.onSubmit(id, payload);
  };

  initialValues = () => {
    const record = this.props.record || {};

    if (!record.type) {
      record.type = "TEXT"
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
                <TextAreaFormItem
                  name={`title`}
                  label={fields.title.label}
                  required={fields.title.required}
                />
                <InputNumberFormItem
                  name={`score`}
                  label={fields.score.label}
                  placeholder="Numbers only!"
                  required={fields.score.required}
                />
                <SelectFormItem
                  defaultValue="TEXT"
                  name={`type`}
                  label={fields.type.label}
                  options={fields.type.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.type.required}
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

export default withRouter(AnswerForm);
