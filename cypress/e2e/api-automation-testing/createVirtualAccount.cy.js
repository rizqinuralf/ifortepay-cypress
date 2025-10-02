const { faker } = require('@faker-js/faker');

describe('Create Virtual Account API', () => {
  const merchant_index = "MCP2023011830";
  const secret_unbound_id = "0x00558c744cb597f6b0";
  const hash_key = "fsNmnFkUGG8nhKYpQGzDWQ4bMQZKA6QGBBRgrbx+tMI";
  const apiUrl = "https://api-stage.mcpayment.id/va";

  // Helper function to calculate SHA256 hash using Web Crypto API
  const calculateSha256 = async (message) => {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hexHash;
  };

  it('should successfully create a virtual account', () => {
    const external_id = faker.string.uuid(); // Unique ID
    const order_id = faker.string.alphanumeric(10) + '-' + faker.string.alphanumeric(5); // Alphanumeric and dash

    // Construct Authorization header
    const authString = `${merchant_index}:${secret_unbound_id}`;
    const authorization = `Basic ${Cypress.Buffer.from(authString).toString('base64')}`;

    // Calculate x-req-signature using Web Crypto API
    const signatureString = `${hash_key}${external_id}${order_id}`;
    
    // Use cy.then to handle the asynchronous nature of calculateSha256
    cy.wrap(calculateSha256(signatureString)).then((xReqSignature) => {
      const requestBody = {
        external_id: external_id,
        order_id: order_id,
        currency: "IDR",
        payment_method: "bank_transfer",
        payment_channel: "MANDIRI",
        payment_details: {
          billing_name: faker.person.fullName(),
        },
        payment_system: "CLOSED",
        amount: 10000, // Minimum amount
        transaction_description: faker.lorem.sentence(),
        customer_details: {
          email: faker.internet.email(),
          full_name: faker.person.fullName(),
          phone: faker.phone.number('##########'), // 10 digits for example
        },
        callback_url: faker.internet.url(),
      };

      cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
          'Authorization': authorization,
          'x-req-signature': xReqSignature,
          'x-version': 'v3',
          'Content-Type': 'application/json',
        },
        body: requestBody,
        failOnStatusCode: false // Do not fail on non-2xx status codes, as per documentation 00 is success
      }).then((response) => {
        expect(response.status).to.eq(200); // Assuming HTTP 200 for success
        expect(response.body.status).to.eq('00'); // As per documentation, 00 is success
        expect(response.body).to.have.property('message', 'Success for success transaction');
        // Add more assertions based on expected successful response body structure
      });
    });
  });
});
