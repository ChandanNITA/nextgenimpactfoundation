import { NextResponse } from 'next/server'
import { volunteerFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = volunteerFormSchema.safeParse(body)

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
          from_name: 'NextGen Impact Volunteer App',
          subject: `New Volunteer Signup: ${result.data.name}`,
          ...result.data,
          skills: result.data.skills.join(', '),
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for volunteering! Our coordinator will contact you soon.',
    })
  } catch (err) {
    console.error('Volunteer Form Error:', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

