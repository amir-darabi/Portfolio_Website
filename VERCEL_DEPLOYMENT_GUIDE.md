# 🚀 Complete Vercel Deployment Guide

This guide will walk you through deploying your portfolio website to Vercel with a fully functional contact form using Resend.

## 📋 Prerequisites Completed

✅ **Resend Account Setup**: You have your API key: `re_HhqK6fWD_HtY8ouGqMvGZTx1bafgQv2Wt`  
✅ **Domain Verification**: Your domain `amirdarabi.me` is verified in Resend  
✅ **DNS Records**: All required DNS records are configured  
✅ **Code Implementation**: Contact form API route and frontend are ready  

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is committed to GitHub:

```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "Add contact form with Resend integration"

# Push to GitHub
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your project**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? → `N`
   - Project name → `my-portfolio` (or your preferred name)
   - Directory → `./` (current directory)
   - Want to override settings? → `N`

4. **Set Environment Variables**:
   ```bash
   vercel env add RESEND_API_KEY
   # Paste: re_HhqK6fWD_HtY8ouGqMvGZTx1bafgQv2Wt
   
   vercel env add FROM_EMAIL
   # Paste: contact@amirdarabi.me
   
   vercel env add TO_EMAIL
   # Paste: amiirdrbii@gmail.com
   ```

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New..." → Project**

3. **Import your GitHub repository**

4. **Configure Project**:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables**:
   - Go to Settings → Environment Variables
   - Add these three variables for **Production**, **Preview**, and **Development**:
   
   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | `re_HhqK6fWD_HtY8ouGqMvGZTx1bafgQv2Wt` |
   | `FROM_EMAIL` | `contact@amirdarabi.me` |
   | `TO_EMAIL` | `amiirdrbii@gmail.com` |

6. **Deploy**: Click "Deploy"

### 3. Custom Domain Setup (Optional)

If you want to use your custom domain:

1. **In Vercel Dashboard** → Your Project → Settings → Domains
2. **Add Domain**: Enter `amirdarabi.me`
3. **Configure DNS**: Update your domain's DNS to point to Vercel:
   - **A Record**: `76.76.19.61`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`

### 4. Test Your Deployment

1. **Visit your site**: Your Vercel URL will be something like `https://my-portfolio-username.vercel.app`

2. **Test the contact form**:
   - Fill out all fields
   - Submit the form
   - Check your email (`amiirdrbii@gmail.com`) for the message

3. **Check Function Logs** (if there are issues):
   - Vercel Dashboard → Your Project → Functions → /api/contact
   - View logs to debug any issues

## 🔍 Troubleshooting

### Contact Form Not Working?

1. **Check Environment Variables**:
   ```bash
   vercel env ls
   ```
   Make sure all 3 variables are set.

2. **Check Function Logs**:
   - Go to Vercel Dashboard → Functions → /api/contact
   - Look for error messages

3. **Common Issues**:
   - **"Email service not configured"**: Environment variables not set
   - **"Failed to send email"**: Check Resend API key or domain verification
   - **DNS issues**: Make sure DNS records in Resend are properly configured

### Email Not Being Received?

1. **Check spam folder** in `amiirdrbii@gmail.com`
2. **Verify DNS records** in Resend dashboard
3. **Check Resend logs** at [resend.com/logs](https://resend.com/logs)

### Build Errors?

1. **Check your local build**:
   ```bash
   npm run build
   ```
2. **Fix any TypeScript or ESLint errors**
3. **Commit and push fixes**

## 🎉 Success Checklist

Once deployed, you should have:

- ✅ **Live website** accessible via your Vercel URL
- ✅ **Working contact form** that sends emails to your inbox
- ✅ **Professional email template** with sender details
- ✅ **Input validation** and security measures
- ✅ **Rate limiting** to prevent spam
- ✅ **Error handling** with user-friendly messages
- ✅ **Responsive design** that works on all devices

## 📧 Email Configuration Details

Your contact form is configured to:

- **Send FROM**: `contact@amirdarabi.me` (your verified domain)
- **Send TO**: `amiirdrbii@gmail.com` (your personal email)
- **Reply-To**: The visitor's email address (so you can reply directly)
- **Rate Limiting**: Maximum 3 submissions per 5 minutes per IP
- **Validation**: Name (2-50 chars), Email (valid format), Message (10-1000 chars)

## 🔄 Future Updates

To update your site:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel will automatically redeploy

## 🆘 Need Help?

If you encounter any issues:

1. **Check Vercel Function logs** in the dashboard
2. **Check Resend logs** at resend.com/logs
3. **Verify environment variables** are set correctly
4. **Test locally** with `npm run dev` first

Your portfolio is now ready for production! 🚀

---

**Deployed Contact Form Features:**
- ✨ Secure input validation and sanitization
- 🛡️ XSS protection and rate limiting
- 📧 Professional HTML email templates
- 🎨 Beautiful glass-morphism UI design
- 📱 Fully responsive on all devices
- ⚡ Lightning-fast serverless functions
