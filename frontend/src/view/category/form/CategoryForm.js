import { i18n } from 'i18n';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import FormSchema from 'view/shared/form/formSchema';
import model from 'modules/category/categoryModel';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';

const { fields } = model;

class CategoryForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.name,
    fields.description,
    fields.featuredImage,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
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

                <InputFormItem
                  name={fields.name.name}
                  label={fields.name.label}
                  required={fields.name.required}
                  autoFocus
                />
                <TextAreaFormItem
                  name={fields.description.name}
                  label={fields.description.label}
                  required={fields.description.required}
                />
                <ImagesFormItem
                  extra="Please upload an image of size 300 x 300 for best result."
                  name={fields.featuredImage.name}
                  label={fields.featuredImage.label}
                  path={fields.featuredImage.path}
                  schema={{
                    size: fields.featuredImage.size,
                  }}
                  max={fields.featuredImage.max}
                  cloudinary={
                    fields.featuredImage.cloudinary
                  }
                />
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

export default CategoryForm;
