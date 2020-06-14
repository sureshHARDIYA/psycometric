import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import QuestionForm from 'view/questionnaire/form/QuestionForm';
import Errors from 'modules/shared/error/errors';
import QuestionService from 'modules/question/questionService';

class QuestionFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await QuestionService.create(data);
      this.props.onSuccess({ id });
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        title={i18n('entities.questionnaire.question.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <QuestionForm
          modal
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          saveLoading={this.state.saveLoading}
          questionnaire={this.props.questionnaire}
        />
      </Modal>
    );
  }
}

export default QuestionFormModal;
