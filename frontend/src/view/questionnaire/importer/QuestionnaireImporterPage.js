import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/questionnaire/importer/QuestionnaireImporterSelectors';
import actions from 'modules/questionnaire/importer/QuestionnaireImporterActions';
import fields from 'modules/questionnaire/importer/QuestionnaireImporterFields';

class CasedImportPage extends Component {
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.questionnaire.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.questionnaire.menu'),
              '/questionnaire',
            ],
            [i18n('entities.questionnaire.importer.title')],
          ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.questionnaire.importer.title')}
          </PageTitle>
          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default CasedImportPage;
