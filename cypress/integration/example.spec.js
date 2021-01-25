describe('Sign up', () => {
 
  it('can load oauth demo site', () => {
    cy.visit('https://stage.4sd.com/');
    cy.contains('The meeting point for gorgeous women and prosperous men.');
  });

  it('I am a Man', () => {
    cy.get('.btn-group').contains('JOIN AS A MAN').click()
    cy.contains('FREE SIGNUP');
  });

  const password = "test-password";
  const username = "FUFU091";
  const age = "50";

  let inboxId;
  let emailAddress;

  let code;

  // const emailAddress = "furmantest00@gmail.com"

  it('can generate a new email address and sign up', () => {
    // see commands.js custom commands
    cy.createInbox().then(inbox => {
      // verify a new inbox was created
      assert.isDefined(inbox);

      // save the inboxId for later checking the emails
      inboxId = inbox.id
      emailAddress = inbox.emailAddress;

      // sign up with inbox email address and the password
      cy.get('[type="email"]').type(emailAddress);
        cy.get('[type="password"]').type(password);
        cy.get('[name="username"]').type(username);
        cy.get('[name="age"]').type(age);
        cy.get('.pac-target-input').type('Alberta').click()
        cy.contains('Alberta').click()
        cy.get('select').select('White')
        cy.get('[type="submit"]').click()
        cy.wait(5000)
    });
  });

  it('can receive the confirmation email and extract the code', () => {
    // wait for an email in the inbox
    cy.waitForLatestEmail(inboxId).then(email => {
      // verify we received an email
      assert.isDefined(email);
      console.log(email.subject, email.body, email.attachments)
      

      // verify that email contains the "code"
      assert.strictEqual(/VALIDATE EMAIL/.test(email.body), true);
      // expect(email.body).to.contain('VALIDATE EMAIL');
      // expect(email.subject).to.contain('Verify Email Address');
      //cy.visit(email.body.text.links[1])
      //cy.get('a[href*="https://tr.4sd.com/tr/*"]').click()
      cy.get('#main').should('contain.text', 'VALIDATE EMAIL').click()

      //https://tr.4sd.com/tr/0125QSWSG6jcJXVsuj76x9CQC821/

    })

      //cy.visit(email.body.text.links[1])

      // extract the confirmation code (so we can confirm the user)
      //code = /([0-9]{6})$/.exec(email.body)[1];
  });

  // it('upload photo', () => {
  //   const fixtureFile = 'photo.png';
  //   cy.get('#root').find('button', 'UPLOAD PHOTO').attachFile(fixtureFile);
  //   // cy.contains('UPLOAD PHOTO').click({force: true})
  //   cy.wait(5000)
  //   cy.contains('NEXT').click()
  // });

  // xit('can enter confirmation code and confirm user', () => {
  //   assert.isDefined(code);
  //   cy.get('[data-test="confirm-sign-up-confirmation-code-input"]').type(code);
  //   cy.get('[data-test="confirm-sign-up-confirm-button"]').click();
  // });

  // it('describe yourself', () => {
  //   cy.get('[name="needs"]').type('Love Love Love');
  //   cy.get('[placeholder="Describe yourself and why someone should want you as their sugar daddy"]').type('Yes Yes Yes');
  //   cy.contains('NEXT').click()
  // });

  // it('smile', () => {
  //   cy.contains('NEXT').click()
  // });
  

  // it('upload photo', () => {
  //   const fixtureFile = 'photo.png';

    // cy.get('#root').find('button', 'UPLOAD PHOTO').attachFile(fixtureFile);
  // cy.contains('UPLOAD PHOTO').click({force: true})
    // cy.contains('NEXT').click({force: true})
  // cy.get('#modal-root').contains('Congratulations')  
  
  // xit('shows the successful greeting', () => {
  //   cy.contains("Welcome");
  // });

});
