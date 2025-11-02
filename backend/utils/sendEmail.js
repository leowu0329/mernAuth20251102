import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const mailOptions = {
      from: `"MERN Auth" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: '郵箱驗證碼',
      html: `
        <div style="font-family: 'Noto Sans TC', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">郵箱驗證</h2>
          <p>感謝您註冊我們的服務！</p>
          <p>您的驗證碼是：</p>
          <div style="background-color: #EEF2FF; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 8px; margin: 0;">${verificationCode}</h1>
          </div>
          <p style="color: #6B7280; font-size: 14px;">此驗證碼將在10分鐘後過期。</p>
          <p style="color: #6B7280; font-size: 14px;">如果您沒有註冊此帳戶，請忽略此郵件。</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const mailOptions = {
      from: `"MERN Auth" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: '重設密碼',
      html: `
        <div style="font-family: 'Noto Sans TC', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">重設密碼</h2>
          <p>我們收到了您的重設密碼請求。</p>
          <p>請點擊下方的按鈕來重設您的密碼：</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">重設密碼</a>
          </div>
          <p style="color: #6B7280; font-size: 14px;">或複製以下連結到瀏覽器：</p>
          <p style="color: #6B7280; font-size: 14px; word-break: break-all;">${resetUrl}</p>
          <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">此連結將在1小時後過期。</p>
          <p style="color: #6B7280; font-size: 14px;">如果您沒有請求重設密碼，請忽略此郵件。</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending reset password email:', error)
    throw error
  }
}
