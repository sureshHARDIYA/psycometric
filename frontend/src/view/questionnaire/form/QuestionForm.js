import { i18n } from 'i18n';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import { Formik, FieldArray } from 'formik';
import { withRouter } from 'react-router-dom';
import model from 'modules/question/questionModel';
import FormSchema from 'view/shared/form/formSchema';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import CheckboxFormItem from 'view/shared/form/items/CheckboxFormItem';

import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';

import {
  Button,
  Form,
  Row,
  Col,
  Popconfirm,
  Divider,
} from 'antd';
import _get from 'lodash/get';

const { fields } = model;

const answerItemLayout = {
  labelCol: {
    md: { span: 8, offset: 4 },
    lg: { span: 8 },
  },
  wrapperCol: {
    md: { span: 12 },
    lg: { span: 10 },
  },
};

const answerTypeItemLayout = {
  labelCol: {
    md: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    md: { span: 12 },
    lg: { span: 10 },
  },
};

class AddQuestion extends Component {
  schema = new FormSchema(fields.id, [
    fields.title,
    fields.explainAnswer,
    fields.questionType,
    fields.answers,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    const { questionID } = this.props;

    delete data.questionType;

    const payload = {
      ...data,
      questionnaire: questionID,
    };

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
                  name={fields.title.name}
                  label={fields.title.label}
                  required={fields.title.required}
                />
                <TextAreaFormItem
                  name={fields.explainAnswer.name}
                  label={fields.explainAnswer.label}
                  required={fields.explainAnswer.required}
                />
                {!!form.values.questionType &&
                  <ViewFormItem
                    name={fields.questionType.name}
                    label={fields.questionType.label}
                  />
                }
                {form.values.type === 'QUIZ' && (
                  <>
                  <Divider orientation="left">
                    Options for the Questions
                  </Divider>
                  <FieldArray
                    name="answers"
                    render={(arrayHelpers) => {
                      const answers = _get(
                        form,
                        'values.answers',
                        [],
                      );

                      if (!answers.length) {
                        return (
                          <Form.Item
                            {...formItemLayout}
                            label="No Answers"
                          >
                            <Button
                              onClick={() =>
                                arrayHelpers.push({
                                  id: `D${Date.now()}`,
                                })
                              }
                              style={{ marginRight: 10 }}
                              type="primary"
                              icon="plus"
                            />
                          </Form.Item>
                        );
                      }

                      return answers.map(
                        (item, index, items) => (
                          <div
                            key={item.id}
                            style={{ marginBottom: 20 }}
                          >
                            <Form.Item
                              {...formItemLayout}
                              label="Answers"
                            >
                              <Row
                                type="flex"
                                justify="start"
                              >
                                <Col span={8}>#{item.id}</Col>
                                <Col
                                  span={16}
                                  style={{
                                    textAlign: 'right',
                                  }}
                                >
                                  {index ===
                                    items.length - 1 && (
                                    <Button
                                      onClick={() =>
                                        arrayHelpers.push({
                                          id: `D${Date.now()}`,
                                        })
                                      }
                                      style={{
                                        marginRight: 10,
                                      }}
                                      type="primary"
                                      icon="plus"
                                    />
                                  )}
                                  <Popconfirm
                                    placement="top"
                                    onConfirm={() =>
                                      arrayHelpers.remove(
                                        index,
                                      )
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                    title={`Are you sure to delete this options?`}
                                  >
                                    <Button
                                      type="danger"
                                      icon="delete"
                                    />
                                  </Popconfirm>
                                </Col>
                              </Row>
                            </Form.Item>
                            <TextAreaFormItem
                              name={`answers.${index}.title`}
                              label={
                                fields.answers.fields.title
                                  .label
                              }
                              required={
                                fields.answers.fields.title
                                  .required
                              }
                            />
                            <Row
                              type="flex"
                              justify="center"
                              style={{
                                justifyContent: 'center',
                                display: 'flex',
                              }}
                            >
                              <Col span={8}>
                                <CheckboxFormItem
                                  name={`answers.${index}.isCorrect`}
                                  label={
                                    fields.answers.fields
                                      .isCorrect.label
                                  }
                                  layout={answerItemLayout}
                                />
                              </Col>
                              <Col span={8}>
                                <InputNumberFormItem
                                  name={`answers.${index}.score`}
                                  label={
                                    fields.answers.fields
                                      .score.label
                                  }
                                  placeholder="Numbers only!"
                                  required={
                                    fields.answers.fields
                                      .score.required
                                  }
                                />
                              </Col>
                              <Col span={8}>
                                <SelectFormItem
                                  defaultValue="TEXT"
                                  name={`answers.${index}.answerType`}
                                  label={
                                    fields.answers.fields
                                      .answerType.label
                                  }
                                  options={fields.answers.fields.answerType.options.map(
                                    (item) => ({
                                      value: item.id,
                                      label: item.label,
                                    }),
                                  )}
                                  required={
                                    fields.answers.fields
                                      .answerType.required
                                  }
                                  layout={
                                    answerTypeItemLayout
                                  }
                                />
                              </Col>
                            </Row>
                            <Divider />
                          </div>
                        ),
                      );
                    }}
                  />
                  </>
                )}
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
