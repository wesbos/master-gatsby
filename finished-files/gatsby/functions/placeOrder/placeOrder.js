const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order: ${total}</h2>
      <p>Please start walking over, we will have you order ready in the next 20 minutes.</p>
      <ul>
        ${order.map(
          item => `
          <li>
            <img width="" src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} -${item.price}
          </li>
        `
        )}
      </ul>
      <p>Your total <strong>${total} is due at pick up.</strong></p>
    </div>
  `;
}

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ name, email, order, total }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Slicks Slices 🍕" <slick@example.com>`, // sender address
    to: `"${name}" <${email}>, orders@example.com`, // list of receivers
    subject: `New Order from ${name}!`, // Subject line
    html: generateOrderEmail({ order, total }),
  });
  return info;
}

exports.handler = async (event, context) => {
  const info = JSON.parse(event.body);
  if (info.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop Bee boop zzzst good bye' }),
    };
  }
  // Validate Data
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!info[field]) {
      console.log(`Field Missing ${field}`);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Oops You are missing ${field}` }),
      };
    }
  }

  await sendMail(info);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'Success' }),
  };
};
