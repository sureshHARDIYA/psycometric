import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import Service from 'modules/rule/service';
import Errors from 'modules/shared/error/errors';
import RuleForm from 'view/questionnaire/form/RuleForm';

class RuleFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (id, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const rs = await !!id ? Service.update(id, data) : Service.create(data);
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
        title={i18n('entities.questionnaire.rule.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
      >
        <RuleForm
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

export default RuleFormModal;
