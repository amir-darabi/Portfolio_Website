# Contact Form Setup with Resend

This portfolio includes a fully functional contact form that uses Resend to send emails when visitors submit the form.

## Setup Instructions

### 1. Get a Resend Account
1. Go to [Resend.com](https://resend.com) and sign up for a free account
2. Verify your email address

### 2. Get Your API Key
1. Go to the [API Keys section](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select "Sending access"
5. Copy the generated API key

### 3. Set Up Your Domain (Recommended)
For production use, you should add and verify your own domain:
1. Go to the [Domains section](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow the DNS verification steps
5. Once verified, you can send emails from `contact@yourdomain.com`

**Note:** Without a custom domain, you can only send emails from `onboarding@resend.dev`, but this is fine for testing.

### 4. Configure Environment Variables
1. Open `.env.local` in your project
2. Add your configuration:
```env
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=contact@yourdomain.com  # Or onboarding@resend.dev for testing
TO_EMAIL=amiirdrbii@gmail.com      # Your email where messages will be sent
```

### 5. Deploy to Vercel
1. Push your code to GitHub
2. Import your project to Vercel
3. In Vercel dashboard, go to your project settings → Environment Variables
4. Add the same environment variables from your `.env.local`

## Testing Locally
1. Make sure your environment variables are set in `.env.local`
2. Run `npm run dev`
3. Go to your contact section and test the form
4. Check your email for the message

## Features Included
- ✅ Input validation and sanitization
- ✅ Rate limiting (3 attempts per 5 minutes)
- ✅ XSS protection
- ✅ Professional HTML email templates
- ✅ Error handling and user feedback
- ✅ Loading states and success messages

## Troubleshooting

### "Email service is not properly configured"
- Make sure `RESEND_API_KEY` is set in your environment variables

### "Failed to send email"
- Check that your API key is correct
- Verify your FROM_EMAIL domain is verified in Resend (or use onboarding@resend.dev)
- Check Vercel function logs for detailed errors

### Rate limiting issues
- Wait 5 minutes between attempts if you hit the limit
- In production, consider implementing Redis-based rate limiting

## Cost
Resend offers:
- 3,000 emails/month free
- $20/month for 50,000 emails
- Perfect for portfolio contact forms

Your contact form is now ready to receive messages! 🎉
