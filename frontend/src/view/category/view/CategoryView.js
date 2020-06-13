import model from 'modules/category/categoryModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
const { fields } = model;

class CategoryView extends Component {
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_, record) => (
        <Link to={`/questionnaire/${record.id}`}>
          {record.id}
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  renderView() {
    const { record, loading } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />
        <TextViewItem
          label={fields.name.label}
          value={fields.name.forView(record.name)}
        />
        <TextViewItem
          label={fields.description.label}
          value={fields.description.forView(
            record.description,
          )}
        />
        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />
        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
        <TableWrapper>
          <Table
            rowKey="id"
            loading={loading}
            columns={this.columns}
            dataSource={record.questionnaires}
            scroll={{ x: true }}
          />
        </TableWrapper>
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default CategoryView;
