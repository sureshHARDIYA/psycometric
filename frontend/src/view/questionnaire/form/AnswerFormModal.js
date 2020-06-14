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

  doSubmit = async (id, data) => {
    console.log('record:', this.props.record)

    try {
      this.setState({
        saveLoading: true,
      });
      const rs = await !!id ? AnswerService.update(id, data) : AnswerService.create(data);
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
        title={i18n('entities.questionnaire.answer.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
      >
        <AnswerForm
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

export default AnswerFormModal;
