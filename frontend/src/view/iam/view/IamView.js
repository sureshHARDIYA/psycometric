import { i18n } from 'i18n';
import moment from 'moment';
import { Tooltip, Tag, Table, Divider } from 'antd';
import Roles from 'security/roles';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import { Link } from 'react-router-dom';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CustomViewItem from 'view/shared/view/CustomViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import TableWrapper from 'view/shared/styles/TableWrapper';

const { fields } = model;

class IamView extends Component {
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
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
  ];

  columns2 = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_, record) => (
        <Link to={`/questionnaire/${record.questionnaire}`}>
          {record.title}
        </Link>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      render: (_, record) => (
        <span>
          {record.score} / {record.total}
        </span>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      render: (_, record) => (
        <span>
          {moment(record.createdAt).format(
            'YYYY-MM-DD HH:mm',
          )}
        </span>
      ),
    },
  ];

  columns3 = [
    {
      title: 'Emotion',
      dataIndex: 'emotion',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      render: (_, record) => (
        <span>
          {moment(record.createdAt).format(
            'YYYY-MM-DD HH:mm',
          )}
        </span>
      ),
    },
  ];

  renderView() {
    const { user, loading } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(user.id)}
        />
        <TextViewItem
          label={fields.authenticationUid.label}
          value={fields.authenticationUid.forView(
            user.authenticationUid,
          )}
        />
        <TextViewItem
          label={fields.email.label}
          value={fields.email.forView(user.email)}
        />
        <TextViewItem
          label={fields.firstName.label}
          value={fields.firstName.forView(user.firstName)}
        />
        <TextViewItem
          label={fields.lastName.label}
          value={fields.lastName.forView(user.lastName)}
        />
        <ImagesViewItem
          label={fields.avatarsIam.label}
          value={user.avatars}
          type="images"
        />
        <CustomViewItem
          label={fields.disabledAsStatus.label}
          value={user.disabled}
          render={(disabled) => {
            const color = disabled ? 'red' : 'green';
            return (
              <Tag color={color}>
                {fields.disabled.forView(disabled)}
              </Tag>
            );
          }}
        />
        <CustomViewItem
          label={fields.roles.label}
          value={user.roles}
          render={(value) =>
            value.map((roleId) => (
              <div key={roleId}>
                <Tooltip
                  title={Roles.descriptionOf(roleId)}
                >
                  <span>{Roles.labelOf(roleId)}</span>
                </Tooltip>
              </div>
            ))
          }
        />
        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(user.createdAt)}
        />
        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(user.updatedAt)}
        />
        {user.playedQuizes.rows && (
          <>
            <Divider dashed orientation="left">
              {i18n('iam.view.playedQuizes')}
            </Divider>
            <TableWrapper>
              <Table
                rowKey="id"
                loading={loading}
                columns={this.columns2}
                dataSource={user.playedQuizes.rows || []}
                scroll={{ x: true }}
              />
            </TableWrapper>
          </>
        )}
        <Divider dashed orientation="left">
          {i18n('iam.view.favouritedQuestionnaire')}
        </Divider>
        <TableWrapper>
          <Table
            rowKey="id"
            loading={loading}
            columns={this.columns}
            dataSource={user.favourites.rows || []}
            scroll={{ x: true }}
          />
        </TableWrapper>
        <Divider dashed orientation="left">
          {i18n('iam.view.emotions')}
        </Divider>
        <TableWrapper>
          <Table
            rowKey="id"
            loading={loading}
            columns={this.columns3}
            dataSource={user.emotion.rows || []}
            scroll={{ x: true }}
          />
        </TableWrapper>
      </ViewWrapper>
    );
  }

  render() {
    const { user, loading } = this.props;

    if (loading || !user) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default IamView;
