import { combineReducers } from 'redux';
import mailTemplate from './mailTemplate';
import getMailTemplate from './getMailTemplate';
import deleteMailTemplate from './deleteMailTemplate';
import UpdateMailTemplate from './updateMailTemplate'
export const mailTemplatereducer = combineReducers({
    mailTemplate:mailTemplate,
    getMailTemplate:getMailTemplate,
    deleteMailTemplate:deleteMailTemplate,
    UpdateMailTemplate:UpdateMailTemplate
});