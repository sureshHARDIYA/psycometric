import model from 'modules/reminder/model';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import { Link } from 'react-router-dom';
import QuestionnaireViewItem from 'view/questionnaire/view/QuestionnaireViewItem';
const { fields } = model;

class ReminderView extends Component {
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
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />
        <TextViewItem
          label={fields.title.label}
          value={fields.title.forView(record.title)}
        />
        <TextViewItem
          label={fields.message.label}
          value={fields.message.forView(record.message)}
        />
        <TextViewItem
          label={fields.schedule.label}
          value={fields.schedule.forView(record.schedule)}
        />
        <TextViewItem
          label={fields.frequency.label}
          value={fields.frequency.forView(record.frequency)}
        />
        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />
        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
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

export default ReminderView;
