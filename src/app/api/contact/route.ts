import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map<string, { attempts: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3,
  windowMs: 5 * 60 * 1000, // 5 minutes
};

// Input validation utilities
const validateInput = {
  name: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Name is required' };
    if (trimmed.length < 2) return { isValid: false, error: 'Name must be at least 2 characters' };
    if (trimmed.length > 50) return { isValid: false, error: 'Name must be less than 50 characters' };
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return { isValid: false, error: 'Name contains invalid characters' };
    return { isValid: true };
  },

  email: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Email is required' };
    if (trimmed.length > 100) return { isValid: false, error: 'Email must be less than 100 characters' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return { isValid: false, error: 'Please enter a valid email address' };
    return { isValid: true };
  },

  message: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Message is required' };
    if (trimmed.length < 10) return { isValid: false, error: 'Message must be at least 10 characters' };
    if (trimmed.length > 1000) return { isValid: false, error: 'Message must be less than 1000 characters' };
    
    // Check for potential malicious content patterns
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b/gi,
      /<object\b/gi,
      /<embed\b/gi
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(trimmed)) {
        return { isValid: false, error: 'Message contains invalid content' };
      }
    }
    return { isValid: true };
  }
};

// HTML sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Rate limiting function
const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const userRecord = rateLimitStore.get(identifier);

  if (!userRecord) {
    rateLimitStore.set(identifier, { attempts: 1, resetTime: now + RATE_LIMIT.windowMs });
    return true;
  }

  if (now > userRecord.resetTime) {
    rateLimitStore.set(identifier, { attempts: 1, resetTime: now + RATE_LIMIT.windowMs });
    return true;
  }

  if (userRecord.attempts >= RATE_LIMIT.maxAttempts) {
    return false;
  }

  userRecord.attempts++;
  return true;
};

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not properly configured' },
        { status: 500 }
      );
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    const nameValidation = validateInput.name(name);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    const emailValidation = validateInput.email(email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    const messageValidation = validateInput.message(message);
    if (!messageValidation.isValid) {
      return NextResponse.json(
        { error: messageValidation.error },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 5 minutes.' },
        { status: 429 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message)
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'contact@amirdarabi.me',
      to: [process.env.TO_EMAIL || 'amiirdrbii@gmail.com'],
      subject: `New Contact Form Message from ${sanitizedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0891b2; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #0891b2; margin-top: 0;">Message</h3>
            <p style="white-space: pre-line; line-height: 1.6;">${sanitizedData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Sender IP: ${clientIP}</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
      replyTo: sanitizedData.email
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
