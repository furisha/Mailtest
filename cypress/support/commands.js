const { MailSlurp } = require("mailslurp-client");

const apiKey = "f38894a11a1ebb0d0fcd667a44a86594b405261afeebf3e107aee8618bc9d3c5";
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
    // instantiate MailSlurp
    const mailslurp = new MailSlurp({ apiKey: "f38894a11a1ebb0d0fcd667a44a86594b405261afeebf3e107aee8618bc9d3c5" });
    // return { id, emailAddress } or a new randomly generated inbox
    return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
    return mailslurp.waitForLatestEmail(inboxId);
});