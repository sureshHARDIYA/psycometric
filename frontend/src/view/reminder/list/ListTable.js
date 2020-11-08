import { i18n } from 'i18n';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import ButtonLink from 'view/shared/styles/ButtonLink';
import { Table, Popconfirm, Divider } from 'antd';
import actions from 'modules/reminder/list/action';
import ReminderSelector from 'modules/reminder/selector';
import selectors from 'modules/reminder/list/selector';
import destroyActions from 'modules/reminder/destroy/action';
import destroySelectors from 'modules/reminder/destroy/selector';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';

class ReminderListTable extends Component {
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
        <Link to={`/reminder/${record.id}`}>
          {record.title}
        </Link>
      ),
    },
    {
      title: 'Message',
      key: 'message-reminder',
      dataIndex: 'message',
      ellipsis: true,
    },
    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Actions',
      dataIndex: '',
      width: '175px',
      render: (_, record) => (
        <div className="table-actions">
          {this.props.hasPermissionToEdit && (
            <Link to={`/reminder/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}{' '}
          <Divider type="vertical" />
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
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
      <div>
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
      </div>
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
    hasPermissionToEdit: ReminderSelector.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: ReminderSelector.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(ReminderListTable);
