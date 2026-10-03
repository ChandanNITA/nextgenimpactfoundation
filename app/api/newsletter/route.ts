import { NextResponse } from 'next/server'
import { newsletterFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = newsletterFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (accessKey) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'NextGen Impact Newsletter',
          subject: `Newsletter Subscribe: ${result.data.email}`,
          email: result.data.email,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully! Thank you for supporting our mission.',
    })
  } catch (err) {
    console.error('Newsletter Form Error:', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}

