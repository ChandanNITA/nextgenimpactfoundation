import { NextResponse } from 'next/server'
import { partnerFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = partnerFormSchema.safeParse(body)

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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (accessKey) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'NextGen Impact Partner Inquiry',
          subject: `Partnership Inquiry: ${result.data.organizationName}`,
          ...result.data,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your partnership inquiry! We will reach out shortly.',
    })
  } catch (err) {
    console.error('Partner Form Error:', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

