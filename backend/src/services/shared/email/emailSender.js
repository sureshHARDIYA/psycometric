const config = require('../../../../config')();
const assert = require('assert');
const sendgrid = require('@sendgrid/mail');

if (process.env.SENDGRID_API) {
  sendgrid.setApiKey(process.env.SENDGRID_API);
}

/**
 * Handles Email sending
 */
module.exports = class EmailSender {
  constructor(email) {
    this.email = email;
  }

  async send() {
    if (!EmailSender.isConfigured) {
      console.error(
        `Email provider is not configured. Please configure it at backend/config/<environment>.json.`,
      );
      return;
    }

    assert(this.email, 'email is required');
    assert(this.email.to, 'email.to is required');
    assert(this.email.subject, 'email.subject is required');
    assert(this.email.html, 'email.html is required');

    const mailOptions = {
      from: this.from,
      to: this.email.to,
      subject: this.email.subject,
      html: this.email.html,
    };

    return sendgrid.send(mailOptions);
  }

  static get isConfigured() {
    return !!process.env.SENDGRID_API;
  }

  get transportConfig() {
    return config.email;
  }

  get from() {
    return config.email.from;
  }
};
