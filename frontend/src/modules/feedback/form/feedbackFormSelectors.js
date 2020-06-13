import { createSelector } from 'reselect';

const selectRaw = (state) => state.feedback.form;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

export default {
  selectSaveLoading,
  selectRaw,
};
