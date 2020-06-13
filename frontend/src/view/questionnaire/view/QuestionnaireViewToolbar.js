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

class CasedViewToolbar extends Component {
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
      isQuiz
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
          <Link to={`/questionnaire/${this.id()}/question`}>
            <Button type="primary" icon="edit">
              Add Question
            </Button>
          </Link>
        )}

        {!isQuiz && (
          <Link to={`/questionnaire/${this.id()}/answer`}>
            <Button type="primary" icon="edit">
              Add Answer
            </Button>
          </Link>
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
