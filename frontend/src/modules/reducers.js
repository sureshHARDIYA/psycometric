import { combineReducers } from 'redux'
import iam from 'modules/iam/iamReducers'
import auth from 'modules/auth/authReducers'
import layout from 'modules/layout/layoutReducers'
import { connectRouter } from 'connected-react-router'
import auditLog from 'modules/auditLog/auditLogReducers'
import settings from 'modules/settings/settingsReducers'
import question from 'modules/question/questionReducers'
import quizRecord from 'modules/quizRecord/quizRecordReducers'
import questionnaire from 'modules/questionnaire/QuestionnaireReducers'
import reminder from 'modules/reminder/reducer'
import feedback from 'modules/feedback/FeedbackReducers'
import answer from 'modules/answer/reducers'
import questionnaireRule from 'modules/rule/reducers'
import emotion from 'modules/emotion/EmotionReducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    iam,
    auditLog,
    settings,
    question,
    quizRecord,
    questionnaire,
    reminder,
    feedback,
    answer,
    questionnaireRule,
    emotion
  })
