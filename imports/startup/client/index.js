// Import client startup through a single index entry point
import { Accounts } from 'meteor/accounts-base';
import './routes.js';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});
