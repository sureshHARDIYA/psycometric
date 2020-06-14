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

  doSubmit = async (id, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const rs = await !!id ? QuestionService.update(id, data) : QuestionService.create(data);
      this.props.onSuccess(rs);
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
      >
        <QuestionForm
          modal
          onSubmit={this.doSubmit}
          record={this.props.record}
          onCancel={this.props.onCancel}
          saveLoading={this.state.saveLoading}
          questionnaire={this.props.questionnaire}
        />
      </Modal>
    );
  }
}

export default QuestionFormModal;
