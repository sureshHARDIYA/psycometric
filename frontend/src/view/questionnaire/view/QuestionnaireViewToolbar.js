import { Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import { connect } from 'react-redux';
import questionnaireSelectors from 'modules/questionnaire/QuestionnaireSelectors';
import destroySelectors from 'modules/questionnaire/destroy/QuestionnaireDestroySelectors';
import destroyActions from 'modules/questionnaire/destroy/QuestionnaireDestroyActions';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';

import AnswerFormModal from 'view/questionnaire/form/AnswerFormModal';
import QuestionFormModal from 'view/questionnaire/form/QuestionFormModal';

class CasedViewToolbar extends Component {
  state = {
    answer: false,
    question: false,
  }

  id = () => {
    return this.props.match.params.id;
  };

  doDestroy = () => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(this.id()));
  };

  render() {
    const {
      hasPermissionToEdit,
      hasPermissionToAuditLogs,
      hasPermissionToDestroy,
      destroyLoading,
    } = this.props;

    return (
      <Toolbar>
        {hasPermissionToEdit && (
          <Link to={`/questionnaire/${this.id()}/edit`}>
            <Button type="primary" icon="edit">
              {i18n('common.edit')}
            </Button>
          </Link>
        )}

        {hasPermissionToEdit && (
          <>
            <Button type="primary" icon="plus" onClick={() => this.setState({ question: true })}>
              Add Question
            </Button>
            <Button type="primary" icon="plus" onClick={() => this.setState({ answer: true })}>
              Add Answer
            </Button>
          </>
        )}
        {hasPermissionToDestroy && (
          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doDestroy()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <Button
              type="primary"
              icon="delete"
              disabled={destroyLoading}
            >
              {i18n('common.destroy')}
            </Button>
          </Popconfirm>
        )}

        {hasPermissionToAuditLogs && (
          <Link
            to={`/audit-logs?entityId=${encodeURIComponent(
              this.id(),
            )}`}
          >
            <Button icon="file-search">
              {i18n('auditLog.menu')}
            </Button>
          </Link>
        )}
        <QuestionFormModal
          visible={this.state.question}
          questionnaire={this.id()}
          onCancel={() => this.setState({ question: false })}
          onSuccess={() => this.setState({ question: false })}
        />
        <AnswerFormModal
          visible={this.state.answer}
          questionnaire={this.id()}
          onCancel={() => this.setState({ answer: false })}
          onSuccess={() => this.setState({ answer: false })}
        />
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: questionnaireSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: questionnaireSelectors.selectPermissionToDestroy(
      state,
    ),
    destroyLoading: destroySelectors.selectLoading(state),
  };
}

export default connect(select)(CasedViewToolbar);
