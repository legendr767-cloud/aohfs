# Forms Integration Guide for AOHF Website

## 🎯 Overview

This guide explains how to integrate form functionality into your AOHF website using Lovable or alternative form services.

---

## 📋 Current Form Status

Your website currently has placeholder forms in the following pages:
1. **Contact Form** - `contact.html`
2. **Volunteer Form** - `volunteer.html`
3. **Donation Form** - `donate.html`
4. **Newsletter Signup** - `index.html` (footer)

All forms currently use **Web3Forms** as a placeholder with `YOUR_ACCESS_KEY_HERE`.

---

## 🔧 Option 1: Lovable Forms Integration

### What You Need from Lovable:

1. **API Endpoint URL**
   - This is the URL where form data will be sent
   - Example: `https://api.lovable.com/submit`

2. **API Key / Access Token**
   - Your unique authentication key
   - Example: `lovable_key_abc123xyz`

3. **Form Configuration**
   - Field mappings
   - Validation rules
   - Success/error handling

### How to Integrate:

#### Step 1: Update Contact Form
Open `contact.html` and replace lines 184-189:

```html
<!-- OLD -->
<form class="contact-form" id="contactForm" action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
    <input type="hidden" name="subject" value="New Contact Form Submission from AOHF Website">
    <input type="hidden" name="from_name" value="AOHF Website">
    <input type="hidden" name="redirect" value="https://yourdomain.com/thank-you.html">

<!-- NEW -->
<form class="contact-form" id="contactForm" action="YOUR_LOVABLE_ENDPOINT_URL" method="POST">
    <input type="hidden" name="api_key" value="YOUR_LOVABLE_API_KEY">
    <input type="hidden" name="form_type" value="contact">
```

#### Step 2: Update Volunteer Form
Open `volunteer.html` and update the form action and API key similarly.

#### Step 3: Update Donation Form
Open `donate.html` and update the form configuration.

#### Step 4: Add JavaScript Handler (Optional)
If Lovable requires JavaScript submission:

```javascript
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('YOUR_LOVABLE_ENDPOINT_URL', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_LOVABLE_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        if (response.ok) {
            alert('Form submitted successfully!');
            this.reset();
        } else {
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    }
});
```

---

## 🔧 Option 2: Alternative Form Services

### Recommended Alternatives:

#### 1. **Formspree** (Easiest)
- **Website:** https://formspree.io
- **Free Tier:** 50 submissions/month
- **Setup Time:** 5 minutes

**Integration:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your form fields -->
</form>
```

**Pros:**
- No backend code needed
- Email notifications
- Spam protection
- Easy setup

**Cons:**
- Limited free tier
- Less customization

---

#### 2. **Web3Forms** (Currently Used)
- **Website:** https://web3forms.com
- **Free Tier:** Unlimited submissions
- **Setup Time:** 5 minutes

**Integration:**
```html
<form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
    <!-- Your form fields -->
</form>
```

**How to Get Access Key:**
1. Visit https://web3forms.com
2. Enter your email (asuwajuodusote@aohfs.com)
3. Click "Create Access Key"
4. Copy the key and replace `YOUR_ACCESS_KEY_HERE` in all forms

**Pros:**
- Completely free
- No registration required
- Email notifications
- Spam protection

**Cons:**
- Limited customization
- No dashboard

---

#### 3. **EmailJS** (JavaScript-based)
- **Website:** https://www.emailjs.com
- **Free Tier:** 200 emails/month
- **Setup Time:** 10 minutes

**Integration:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            alert('Message sent successfully!');
        }, function(error) {
            alert('Failed to send message: ' + error);
        });
});
```

**Pros:**
- Good free tier
- Email templates
- Dashboard
- Custom branding

**Cons:**
- Requires JavaScript
- More complex setup

---

#### 4. **Netlify Forms** (If hosting on Netlify)
- **Website:** https://www.netlify.com
- **Free Tier:** 100 submissions/month
- **Setup Time:** 2 minutes

**Integration:**
```html
<form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- Your form fields -->
</form>
```

**Pros:**
- Built into Netlify
- Very easy setup
- Spam protection
- Form notifications

**Cons:**
- Only works on Netlify
- Limited free tier

---

## 📊 Comparison Table

| Service | Free Tier | Setup Difficulty | Best For |
|---------|-----------|------------------|----------|
| **Lovable** | Varies | Medium | Custom requirements |
| **Formspree** | 50/month | Easy | Quick setup |
| **Web3Forms** | Unlimited | Very Easy | Simple forms |
| **EmailJS** | 200/month | Medium | Custom emails |
| **Netlify Forms** | 100/month | Very Easy | Netlify hosting |

---

## 🎯 Recommended Approach

### For Immediate Deployment:
**Use Web3Forms** (5 minutes setup)

1. Go to https://web3forms.com
2. Enter email: `asuwajuodusote@aohfs.com`
3. Get your access key
4. Replace `YOUR_ACCESS_KEY_HERE` in these files:
   - `contact.html` (line 186)
   - `volunteer.html` (similar location)
   - `donate.html` (similar location)

### For Long-term Solution:
**Use Lovable** (if you have account) or **EmailJS** (for more control)

---

## 📝 Form Fields Currently in Website

### Contact Form:
- First Name
- Last Name
- Email
- Phone
- Subject (dropdown)
- Message
- Newsletter checkbox

### Volunteer Form:
- Full Name
- Email
- Phone
- Location
- Skills
- Availability
- Message

### Donation Form:
- Amount
- Frequency (one-time/monthly)
- Payment method
- Donor information

---

## 🔒 Security Considerations

1. **Never expose API keys in frontend code**
   - Use environment variables
   - Use server-side processing for sensitive data

2. **Add CAPTCHA for spam protection**
   - Google reCAPTCHA
   - hCaptcha
   - Cloudflare Turnstile

3. **Validate all inputs**
   - Client-side validation (already implemented)
   - Server-side validation (required)

4. **Use HTTPS**
   - Already configured in your website

---

## 🚀 Next Steps

1. **Choose your form service** (Web3Forms recommended for quick start)
2. **Get your API key/access token**
3. **Update form action URLs** in all HTML files
4. **Test all forms** thoroughly
5. **Set up email notifications**
6. **Monitor form submissions**

---

## 📞 Support

If you need help with form integration:
- **Email:** asuwajuodusote@aohfs.com
- **Phone:** +234 816 693 1129

---

## ✅ Checklist

- [ ] Choose form service
- [ ] Create account and get API key
- [ ] Update contact.html
- [ ] Update volunteer.html
- [ ] Update donate.html
- [ ] Update newsletter signup
- [ ] Test all forms
- [ ] Set up email notifications
- [ ] Add spam protection
- [ ] Monitor submissions

---

**Last Updated:** May 2, 2026
**Status:** Ready for Integration
