// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, cc, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'litnitimounsef@gmail.com',
                pass: 'slpnmsoifpcjttbg'
            }
        });

        const mailOptions = {
            from: 'litnitimounsef@gmail.com',
            to: to,
            cc: cc,
            subject: subject,
            text: message
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
