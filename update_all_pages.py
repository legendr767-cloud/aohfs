#!/usr/bin/env python3
"""
Script to update all HTML pages with:
1. New email: asuwajuodusote@aohfs.com
2. New social media links
3. Standardized footer
4. WhatsApp and call indicators
"""

import os
import re
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

# Old and new email
OLD_EMAIL = "asuwaju.aohf@gmail.com"
NEW_EMAIL = "asuwajuodusote@aohfs.com"

# Social media links
SOCIAL_LINKS_HTML = '''                    <div class="social-links">
                        <a href="https://www.facebook.com/profile.php?id=61587400866153" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/aohf_foundation?igsh=MWx4NHF0ZnE3NDNsMw==" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://tiktok.com/@aohffoundation" class="social-link" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                        <a href="https://x.com/Aohf_foundation" class="social-link" aria-label="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                    </div>'''

# Phone number with WhatsApp indicator
PHONE_WHATSAPP_HTML = '<a href="https://wa.me/2348166931129" class="contact-item">\n                            <i class="fab fa-whatsapp"></i>\n                            +234 816 693 1129 (WhatsApp)\n                        </a>\n                        <a href="tel:+2348166931129" class="contact-item">\n                            <i class="fas fa-phone"></i>\n                            +234 816 693 1129 (Call)\n                        </a>'

def update_html_file(filepath):
    """Update a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Update email addresses
        content = content.replace(OLD_EMAIL, NEW_EMAIL)
        
        # 2. Update old Instagram link
        content = re.sub(
            r'https://www\.instagram\.com/aohffoundation\?igsh=MWxxcXRiZTY4dnQzZw%3D%3D&utm_source=qr',
            'https://www.instagram.com/aohf_foundation?igsh=MWx4NHF0ZnE3NDNsMw==',
            content
        )
        
        # 3. Update old TikTok link
        content = re.sub(
            r'https://www\.tiktok\.com/@aohf\.foundation\?_t=ZS-90jUGmHbmYn&_r=1',
            'https://tiktok.com/@aohffoundation',
            content
        )
        
        # 4. Update social links in footer-bottom
        # Find and replace old social links pattern
        old_social_pattern = r'<div class="social-links">[\s\S]*?</div>\s*</div>\s*</div>\s*</footer>'
        if re.search(old_social_pattern, content):
            content = re.sub(
                r'<div class="social-links">[\s\S]*?</div>(\s*</div>\s*</div>\s*</footer>)',
                SOCIAL_LINKS_HTML + r'\1',
                content
            )
        
        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {filepath.name}")
            return True
        else:
            print(f"- No changes: {filepath.name}")
            return False
            
    except Exception as e:
        print(f"✗ Error updating {filepath.name}: {e}")
        return False

def main():
    """Main function to update all HTML files"""
    print("=" * 60)
    print("AOHF Website Update Script")
    print("=" * 60)
    print()
    
    # Get all HTML files (excluding old/backup files)
    html_files = []
    for pattern in ['*.html', 'blog/*.html']:
        html_files.extend(BASE_DIR.glob(pattern))
    
    # Exclude old/backup files
    html_files = [f for f in html_files if not any(x in f.name for x in ['-old', '-corrupted', '-complex'])]
    
    print(f"Found {len(html_files)} HTML files to update")
    print()
    
    updated_count = 0
    for filepath in sorted(html_files):
        if update_html_file(filepath):
            updated_count += 1
    
    print()
    print("=" * 60)
    print(f"Update Complete: {updated_count}/{len(html_files)} files updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
