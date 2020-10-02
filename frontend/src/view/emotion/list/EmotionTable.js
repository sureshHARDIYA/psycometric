import { i18n } from 'i18n';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { Component } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import ButtonLink from 'view/shared/styles/ButtonLink';
import TableWrapper from 'view/shared/styles/TableWrapper';
import actions from 'modules/emotion/list/EmotionListActions';
import quizRecordSelectors from 'modules/emotion/EmotionSelectors';
import selectors from 'modules/emotion/list/EmotionListSelectors';
import destroyActions from 'modules/questionnaire/destroy/QuestionnaireDestroyActions';
import destroySelectors from 'modules/questionnaire/destroy/QuestionnaireDestroySelectors';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';

class EmotionListTable extends Component {
  state = {
    selectedValues: null,
  };

  onAuditLogViewModalClose() {
    this.setState({ selectedValues: null });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch());
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    {
      title: 'Title',
      dataIndex: 'id',
      render: (_, record) => (
        <Link to={`/questionnaire/${record.id}`}>
          {record.id}
        </Link>
      ),
    },
    {
      title: 'Emotion',
      dataIndex: 'emotion',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (_, record) => record.createdBy ? <span><Link to={`/iam/${record.createdBy.id}`}>
        {record.createdBy.fullName}
      </Link></span> : ""
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      render: (_, record) => <span>{moment(record.createdAt).format('YYYY-MM-DD HH:mm')}</span>
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <ButtonLink
          onClick={() =>
            this.setState({
              selectedValues: JSON.stringify(
                record,
                null,
                2,
              ),
            })
          }
        >
          {i18n('common.view')}
        </ButtonLink>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;
    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
        <AuditLogViewModal
          visible={!!this.state.selectedValues}
          code={this.state.selectedValues}
          onCancel={() => this.onAuditLogViewModalClose()}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: quizRecordSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: quizRecordSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(EmotionListTable);
