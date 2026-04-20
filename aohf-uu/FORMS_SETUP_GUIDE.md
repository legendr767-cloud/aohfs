# Forms Setup Guide for AOHF Website

## Current Status
The website has 3 main forms that need backend integration:
1. **Contact Form** (`contact.html`)
2. **Volunteer Form** (`volunteer.html`)
3. **Newsletter Form** (`index.html`)

## Recommended Solution: Formspree (FREE)

Formspree is a free form backend service that's perfect for static websites. It handles form submissions and sends them to your email.

### Setup Steps:

#### Option 1: Formspree (Recommended - FREE)

1. **Sign up at https://formspree.io** (Free plan allows 50 submissions/month)

2. **Update Contact Form** (`contact.html`):
   - Find the form tag: `<form class="contact-form" id="contactForm">`
   - Add Formspree action:
   ```html
   <form class="contact-form" id="contactForm" 
         action="https://formspree.io/f/YOUR_FORM_ID" 
         method="POST">
   ```

3. **Update Volunteer Form** (`volunteer.html`):
   - Find the form tag
   - Add Formspree action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

4. **Update Newsletter Form** (`index.html`):
   - Find: `<form class="newsletter-form" id="newsletter-form">`
   - Add Formspree action:
   ```html
   <form class="newsletter-form" id="newsletter-form" 
         action="https://formspree.io/f/YOUR_FORM_ID" 
         method="POST">
   ```

#### Option 2: Web3Forms (Alternative - FREE)

1. **Get API key at https://web3forms.com** (Unlimited submissions, free forever)

2. **Add hidden input to each form**:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

3. **Update form action**:
   ```html
   <form action="https://api.web3forms.com/submit" method="POST">
   ```

#### Option 3: EmailJS (JavaScript-based - FREE)

1. **Sign up at https://www.emailjs.com** (200 emails/month free)

2. **Add EmailJS SDK** to your HTML head:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

3. **Initialize in JavaScript**:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```

4. **Update form submission handlers** in:
   - `assets/js/contact.js`
   - `assets/js/volunteer.js`
   - `assets/js/main.js` (newsletter)

#### Option 4: Google Forms (Easiest - FREE)

1. **Create Google Forms** for each form type

2. **Embed or redirect** to Google Forms

3. **Style with custom CSS** to match your design

## Quick Implementation (Formspree)

I've prepared the forms to work with Formspree. Here's what you need to do:

### Step 1: Create Formspree Account
1. Go to https://formspree.io
2. Sign up with your email (asuwaju.aohf@gmail.com)
3. Verify your email

### Step 2: Create Forms
1. Create 3 forms in Formspree dashboard:
   - "AOHF Contact Form"
   - "AOHF Volunteer Form"
   - "AOHF Newsletter"

2. Copy each form's endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)

### Step 3: Update Website
Run this command to update all forms automatically:

```bash
# Replace YOUR_CONTACT_FORM_ID, YOUR_VOLUNTEER_FORM_ID, YOUR_NEWSLETTER_FORM_ID
# with the actual IDs from Formspree

sed -i 's|<form class="contact-form" id="contactForm">|<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_CONTACT_FORM_ID" method="POST">|' contact.html

sed -i 's|<form>|<form action="https://formspree.io/f/YOUR_VOLUNTEER_FORM_ID" method="POST">|' volunteer.html

sed -i 's|<form class="newsletter-form" id="newsletter-form">|<form class="newsletter-form" id="newsletter-form" action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID" method="POST">|' index.html
```

### Step 4: Test
1. Submit each form
2. Check your email for submissions
3. Verify all fields are captured correctly

## Benefits of Formspree:
- ✅ No backend code needed
- ✅ Spam protection included
- ✅ Email notifications
- ✅ File uploads supported
- ✅ AJAX submissions work
- ✅ Custom thank you pages
- ✅ Export submissions to CSV

## Current JavaScript Handling
The existing JavaScript validation will still work! Formspree works alongside your current code.

## Alternative: PHP Backend (If you have hosting with PHP)

If your hosting supports PHP, I can create a simple PHP script:

```php
<?php
// contact-handler.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "asuwaju.aohf@gmail.com";
    $subject = "Contact Form Submission";
    $message = "Name: " . $_POST['firstName'] . " " . $_POST['lastName'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Message: " . $_POST['message'];
    
    mail($to, $subject, $message);
    header("Location: thank-you.html");
}
?>
```

Then update form action to: `action="contact-handler.php"`

## Recommendation

**For immediate production deployment**: Use **Formspree** or **Web3Forms**
- Quick setup (5 minutes)
- No coding required
- Free forever for your traffic volume
- Professional and reliable

Let me know which option you prefer, and I can implement it immediately!
