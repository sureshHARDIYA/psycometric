import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import AnswerForm from 'view/questionnaire/form/AnswerForm';
import Errors from 'modules/shared/error/errors';
import AnswerService from 'modules/answer/service';

class AnswerFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await AnswerService.create(data);
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
        title={i18n('entities.questionnaire.answer.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <AnswerForm
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

export default AnswerFormModal;
