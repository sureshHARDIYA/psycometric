import { createSelector } from 'reselect';

const selectRaw = (state) => state.questionnaire.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

export default {
  selectLoading,
  selectRecord,
  selectRaw,
};
