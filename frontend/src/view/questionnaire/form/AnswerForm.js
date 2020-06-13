import { i18n } from 'i18n';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import model from 'modules/answer/model';
import FormSchema from 'view/shared/form/formSchema';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';

import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';

import {
  Button,
  Form,
} from 'antd';
import _get from 'lodash/get';

const { fields } = model;

class AddQuestion extends Component {
  schema = new FormSchema(fields.id, [
    fields.id,
    fields.title,
    fields.score,
    fields.answerType
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    const { questionnaireId } = this.props;

    const payload = {
      ...data,
      questionnaireId: questionnaireId,
    };

    if (!payload.answerType) {
      payload.answerType = "TEXT"
    }

    this.props.onSubmit(id, payload);
  };

  initialValues = () => {
    const record = this.props.record;

    return this.schema.initialValues(record || {});
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
                  label={fields.title .label}
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
                  name={`answerType`}
                  label={fields.answerType.label}
                  options={fields.answerType.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.answerType.required}
                />
                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
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

export default withRouter(AddQuestion);
