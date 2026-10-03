import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // Web3Forms API submission if access key is set
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (accessKey) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'NextGen Impact Website',
          ...result.data,
          subject: `Contact Form: ${result.data.subject}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send via Web3Forms')
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
    })
  } catch (err) {
    console.error('Contact Form Error:', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
