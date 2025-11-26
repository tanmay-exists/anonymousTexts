import {resend} from '../lib/resend.ts'
import VerificationEmail from '../../emails/VerificationEmail.tsx'
import {ApiResponse} from '../types/ApiResponse.ts'

export async function sendVerificationEmail (
  email: string,
  username: string,
  verifyCode: string
): Promies<ApiResponse> {
  
  try {
    await resend.emails.send({
      from:'Acme <onboarding@resend.dev>',
      to:email,
      subject:'Anonymous Texts Verification code',
      react: VerificationEmail({username, otp:verifyCode}),
    })
    return {success: true, message: 'Verification email sent successfully'} 
  } catch (emailError) {
    console.error("Error sending verification email", emailError) 
    return {success: false, message: 'Failed to send verification email'}
  }

}
