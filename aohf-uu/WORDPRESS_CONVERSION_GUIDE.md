# Complete WordPress Theme Conversion Guide for AOHF Website

## 📋 Overview

This guide will help you convert your AOHF static HTML website into a fully functional WordPress theme. Your website is already structured perfectly for WordPress conversion.

---

## 🎯 Why Your Site is WordPress-Ready

✅ **Clean HTML Structure** - Semantic markup  
✅ **Modular Sections** - Easy to convert to template parts  
✅ **Relative Paths** - All assets use relative URLs  
✅ **Consistent Navigation** - Easy to convert to WordPress menus  
✅ **Blog Structure** - Already follows WordPress post format  
✅ **Forms Ready** - Can integrate with WordPress plugins  
✅ **Responsive Design** - Mobile-friendly CSS  
✅ **SEO Optimized** - Schema.org markup included  

---

## 📁 WordPress Theme Structure

Here's how your files will be organized:

```
aohf-wordpress-theme/
├── style.css                    (Theme info + main styles)
├── functions.php                (Theme functions)
├── index.php                    (Main template)
├── header.php                   (Header section)
├── footer.php                   (Footer section)
├── sidebar.php                  (Sidebar if needed)
├── single.php                   (Single blog post)
├── page.php                     (Static pages)
├── front-page.php              (Home page)
├── archive.php                  (Blog listing)
├── 404.php                      (Error page)
├── screenshot.png               (Theme preview - 1200x900px)
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── 3d-effects.css
│   │   └── mobile-optimized.css
│   ├── js/
│   │   └── (all your JS files)
│   └── images/
│       └── (all images)
│
├── template-parts/
│   ├── navigation.php
│   ├── hero.php
│   └── content-blog.php
│
├── page-templates/
│   ├── template-about.php
│   ├── template-contact.php
│   ├── template-team.php
│   └── template-donate.php
│
├── inc/
│   ├── custom-post-types.php
│   ├── widgets.php
│   └── customizer.php
│
├── pictures/                    (Your images)
├── Team/                        (Team photos)
└── blog/                        (Blog images)
```

---

## 🚀 Step-by-Step Conversion Process

### Phase 1: Setup WordPress Theme Foundation (30 minutes)

#### Step 1: Create Theme Folder
```bash
# Create new theme folder in WordPress
wp-content/themes/aohf-theme/
```

#### Step 2: Create style.css (Theme Header)
```css
/*
Theme Name: AOHF Humanitarian Foundation
Theme URI: https://yoursite.com
Author: AOHF Team
Author URI: https://yoursite.com
Description: Custom WordPress theme for Asuwaju Odusote Humanitarian Foundation
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: aohf
Tags: nonprofit, charity, humanitarian, responsive, modern
*/

/* Import your existing styles */
@import url('assets/css/style.css');
@import url('assets/css/3d-effects.css');
@import url('assets/css/mobile-optimized.css');
```

#### Step 3: Create functions.php
```php
<?php
/**
 * AOHF Theme Functions
 */

// Theme Setup
function aohf_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'aohf'),
        'footer' => __('Footer Menu', 'aohf'),
    ));
    
    // Add image sizes
    add_image_size('team-photo', 400, 400, true);
    add_image_size('blog-featured', 1200, 600, true);
    add_image_size('hero-image', 1920, 1080, true);
}
add_action('after_setup_theme', 'aohf_theme_setup');

// Enqueue Styles and Scripts
function aohf_enqueue_assets() {
    // Styles
    wp_enqueue_style('aohf-style', get_stylesheet_uri());
    wp_enqueue_style('aohf-main', get_template_directory_uri() . '/assets/css/style.css');
    wp_enqueue_style('aohf-3d', get_template_directory_uri() . '/assets/css/3d-effects.css');
    wp_enqueue_style('aohf-mobile', get_template_directory_uri() . '/assets/css/mobile-optimized.css');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    wp_enqueue_style('aos', 'https://unpkg.com/aos@2.3.1/dist/aos.css');
    
    // Scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('aos', 'https://unpkg.com/aos@2.3.1/dist/aos.js', array(), null, true);
    wp_enqueue_script('aohf-main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0', true);
    wp_enqueue_script('aohf-3d', get_template_directory_uri() . '/assets/js/3d-effects.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'aohf_enqueue_assets');

// Register Widget Areas
function aohf_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget Area 1', 'aohf'),
        'id'            => 'footer-1',
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'aohf_widgets_init');

// Custom Post Type: Team Members
function aohf_register_team_post_type() {
    register_post_type('team_member', array(
        'labels' => array(
            'name' => 'Team Members',
            'singular_name' => 'Team Member',
        ),
        'public' => true,
        'has_archive' => false,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
    ));
}
add_action('init', 'aohf_register_team_post_type');

// Custom Post Type: Projects
function aohf_register_projects_post_type() {
    register_post_type('project', array(
        'labels' => array(
            'name' => 'Projects',
            'singular_name' => 'Project',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-portfolio',
    ));
}
add_action('init', 'aohf_register_projects_post_type');

// Add custom fields support
function aohf_add_meta_boxes() {
    add_meta_box('team_member_info', 'Team Member Information', 'aohf_team_member_meta_box', 'team_member', 'normal', 'high');
}
add_action('add_meta_boxes', 'aohf_add_meta_boxes');

function aohf_team_member_meta_box($post) {
    $role = get_post_meta($post->ID, 'team_role', true);
    $email = get_post_meta($post->ID, 'team_email', true);
    ?>
    <p>
        <label>Role:</label>
        <input type="text" name="team_role" value="<?php echo esc_attr($role); ?>" style="width:100%;">
    </p>
    <p>
        <label>Email:</label>
        <input type="email" name="team_email" value="<?php echo esc_attr($email); ?>" style="width:100%;">
    </p>
    <?php
}

// Save custom fields
function aohf_save_team_member_meta($post_id) {
    if (isset($_POST['team_role'])) {
        update_post_meta($post_id, 'team_role', sanitize_text_field($_POST['team_role']));
    }
    if (isset($_POST['team_email'])) {
        update_post_meta($post_id, 'team_email', sanitize_email($_POST['team_email']));
    }
}
add_action('save_post_team_member', 'aohf_save_team_member_meta');
?>
```

---

### Phase 2: Convert Header & Footer (1 hour)

#### Create header.php
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Loading Screen -->
<div id="loading-screen" class="active">
    <div class="loader-container">
        <div class="loader-3d">
            <!-- Your loader HTML -->
        </div>
    </div>
</div>

<!-- Header -->
<header class="header-3d">
    <div class="header-top">
        <div class="container">
            <div class="header-top-content">
                <div class="contact-info">
                    <a href="mailto:<?php echo get_option('admin_email'); ?>" class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <?php echo get_option('admin_email'); ?>
                    </a>
                    <a href="tel:+2348166931129" class="contact-item">
                        <i class="fas fa-phone"></i>
                        +234 816 693 1129
                    </a>
                </div>
                <div class="header-actions">
                    <a href="<?php echo home_url('/volunteer'); ?>" class="btn-volunteer">
                        <i class="fas fa-hands-helping"></i>
                        Become a Volunteer
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <nav class="navbar-3d">
        <div class="container">
            <div class="navbar-content">
                <div class="logo-container">
                    <a href="<?php echo home_url(); ?>" class="logo-3d">
                        <?php if (has_custom_logo()) {
                            the_custom_logo();
                        } else { ?>
                            <img src="<?php echo get_template_directory_uri(); ?>/pictures/logo.jpg" alt="AOHF Logo" class="logo-img">
                            <span class="logo-text">AOHF</span>
                        <?php } ?>
                    </a>
                </div>
                
                <div class="nav-menu" id="nav-menu">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container' => false,
                        'menu_class' => 'nav-list',
                        'fallback_cb' => false,
                    ));
                    ?>
                    
                    <!-- Mobile Donate Button -->
                    <div class="mobile-donate-section">
                        <a href="<?php echo home_url('/donate'); ?>" class="mobile-donate-btn">
                            <i class="fas fa-heart"></i>
                            <span>Donate Now</span>
                        </a>
                    </div>
                </div>
                
                <div class="nav-actions">
                    <a href="<?php echo home_url('/donate'); ?>" class="btn-donate-3d">
                        <i class="fas fa-heart"></i>
                        Donate Now
                    </a>
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
```

#### Create footer.php
```php
<!-- Footer -->
<footer class="footer-3d">
    <div class="footer-main">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <?php if (has_custom_logo()) {
                            the_custom_logo();
                        } else { ?>
                            <img src="<?php echo get_template_directory_uri(); ?>/pictures/logo.jpg" alt="AOHF Logo">
                        <?php } ?>
                        <h3><?php bloginfo('name'); ?></h3>
                    </div>
                    <p><?php bloginfo('description'); ?></p>
                    <div class="footer-contact">
                        <p><i class="fas fa-map-marker-alt"></i> No 5 olumide igbagba close egbe town Atiba ijebu Ogun state Nigeria</p>
                        <p><i class="fas fa-envelope"></i> <?php echo get_option('admin_email'); ?></p>
                        <p><i class="fas fa-phone"></i> +234 816 693 1129</p>
                    </div>
                </div>
                
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'container' => false,
                        'menu_class' => '',
                    ));
                    ?>
                </div>
            </div>
        </div>
    </div>
    
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
```

---

### Phase 3: Convert Main Pages (2 hours)

#### Create front-page.php (Home Page)
```php
<?php
/**
 * Template Name: Home Page
 */
get_header(); ?>

<!-- Hero Section -->
<section class="hero-3d">
    <!-- Copy your hero section HTML here -->
    <!-- Replace static content with WordPress functions -->
</section>

<!-- About Section -->
<section class="about-preview-3d">
    <?php
    $about_page = get_page_by_path('about');
    if ($about_page) {
        echo wp_trim_words($about_page->post_content, 50);
    }
    ?>
</section>

<!-- Blog Section -->
<section class="blog-preview">
    <div class="container">
        <h2>Latest Updates</h2>
        <div class="blog-grid">
            <?php
            $recent_posts = new WP_Query(array(
                'posts_per_page' => 3,
                'post_status' => 'publish'
            ));
            
            while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                <article class="blog-card">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="blog-image">
                            <?php the_post_thumbnail('blog-featured'); ?>
                        </div>
                    <?php endif; ?>
                    <div class="blog-content">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
                    </div>
                </article>
            <?php endwhile;
            wp_reset_postdata();
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

#### Create page.php (Static Pages)
```php
<?php get_header(); ?>

<div class="page-content">
    <div class="container">
        <?php
        while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h1><?php the_title(); ?></h1>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
```

#### Create single.php (Blog Posts)
```php
<?php get_header(); ?>

<div class="blog-post-single">
    <div class="container">
        <?php
        while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <h1><?php the_title(); ?></h1>
                    <div class="post-meta">
                        <span class="date"><?php echo get_the_date(); ?></span>
                        <span class="author">By <?php the_author(); ?></span>
                    </div>
                </header>
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="featured-image">
                        <?php the_post_thumbnail('blog-featured'); ?>
                    </div>
                <?php endif; ?>
                
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
                
                <footer class="entry-footer">
                    <?php
                    the_post_navigation(array(
                        'prev_text' => '← Previous Post',
                        'next_text' => 'Next Post →',
                    ));
                    ?>
                </footer>
            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
```

#### Create archive.php (Blog Listing)
```php
<?php get_header(); ?>

<section class="blog-archive">
    <div class="container">
        <h1>Blog</h1>
        <div class="blog-grid">
            <?php
            if (have_posts()) :
                while (have_posts()) : the_post(); ?>
                    <article class="blog-card">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="blog-image">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('blog-featured'); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        <div class="blog-content">
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <div class="post-meta">
                                <span><?php echo get_the_date(); ?></span>
                            </div>
                            <p><?php the_excerpt(); ?></p>
                            <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
                        </div>
                    </article>
                <?php endwhile;
                
                the_posts_pagination();
            else :
                echo '<p>No posts found.</p>';
            endif;
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

---

### Phase 4: Custom Page Templates (1 hour)

#### Create page-templates/template-team.php
```php
<?php
/**
 * Template Name: Team Page
 */
get_header(); ?>

<section class="team-section">
    <div class="container">
        <h1>Our Team</h1>
        <div class="team-grid">
            <?php
            $team_members = new WP_Query(array(
                'post_type' => 'team_member',
                'posts_per_page' => -1,
                'orderby' => 'menu_order',
                'order' => 'ASC'
            ));
            
            while ($team_members->have_posts()) : $team_members->the_post();
                $role = get_post_meta(get_the_ID(), 'team_role', true);
                $email = get_post_meta(get_the_ID(), 'team_email', true);
                ?>
                <div class="team-member-3d">
                    <div class="member-card-3d">
                        <div class="member-image-3d">
                            <?php the_post_thumbnail('team-photo'); ?>
                        </div>
                        <div class="member-info-3d">
                            <h3><?php the_title(); ?></h3>
                            <p class="member-role"><?php echo esc_html($role); ?></p>
                            <div class="member-bio">
                                <?php the_content(); ?>
                            </div>
                            <?php if ($email) : ?>
                                <a href="mailto:<?php echo esc_attr($email); ?>" class="member-email">
                                    <i class="fas fa-envelope"></i>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endwhile;
            wp_reset_postdata();
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

#### Create page-templates/template-contact.php
```php
<?php
/**
 * Template Name: Contact Page
 */
get_header(); ?>

<section class="contact-page">
    <div class="container">
        <h1>Contact Us</h1>
        
        <!-- Use Contact Form 7 plugin -->
        <?php echo do_shortcode('[contact-form-7 id="1" title="Contact form"]'); ?>
        
        <!-- Or your custom form -->
        <form class="contact-form" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
            <input type="hidden" name="action" value="aohf_contact_form">
            <?php wp_nonce_field('aohf_contact_form', 'contact_nonce'); ?>
            
            <!-- Your form fields -->
        </form>
    </div>
</section>

<?php get_footer(); ?>
```

---

### Phase 5: Forms Integration (30 minutes)

#### Option 1: Use Contact Form 7 Plugin (Recommended)
```bash
# Install Contact Form 7 plugin
# Create forms in WordPress admin
# Use shortcodes in templates
```

#### Option 2: Custom Form Handler in functions.php
```php
// Handle contact form submission
function aohf_handle_contact_form() {
    if (!isset($_POST['contact_nonce']) || !wp_verify_nonce($_POST['contact_nonce'], 'aohf_contact_form')) {
        wp_die('Security check failed');
    }
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Send email
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission';
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = array('Content-Type: text/html; charset=UTF-8');
    
    wp_mail($to, $subject, $body, $headers);
    
    // Redirect
    wp_redirect(home_url('/thank-you'));
    exit;
}
add_action('admin_post_nopriv_aohf_contact_form', 'aohf_handle_contact_form');
add_action('admin_post_aohf_contact_form', 'aohf_handle_contact_form');
```

---

## 🔧 Required WordPress Plugins

### Essential Plugins:
1. **Contact Form 7** - For forms
2. **Yoast SEO** - SEO optimization
3. **WP Super Cache** - Performance
4. **Akismet** - Spam protection
5. **UpdraftPlus** - Backups

### Recommended Plugins:
6. **Advanced Custom Fields (ACF)** - Custom fields
7. **WPForms** - Alternative form builder
8. **Smush** - Image optimization
9. **Wordfence** - Security
10. **MonsterInsights** - Google Analytics

---

## 📝 Migration Checklist

### Before Migration:
- [ ] Backup current website
- [ ] Install WordPress locally first
- [ ] Test theme on staging site
- [ ] Export all blog posts
- [ ] Save all images
- [ ] Document custom functionality

### During Migration:
- [ ] Install WordPress
- [ ] Upload theme files
- [ ] Activate theme
- [ ] Create pages
- [ ] Import blog posts
- [ ] Upload team member photos
- [ ] Configure menus
- [ ] Set up forms
- [ ] Install plugins
- [ ] Configure SEO

### After Migration:
- [ ] Test all pages
- [ ] Test all forms
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test navigation
- [ ] Check image loading
- [ ] Test contact forms
- [ ] Set up redirects
- [ ] Submit sitemap to Google
- [ ] Monitor for errors

---

## 🎓 Learning Resources

### WordPress Development:
- WordPress Codex: https://codex.wordpress.org/
- Theme Handbook: https://developer.wordpress.org/themes/
- Plugin Handbook: https://developer.wordpress.org/plugins/

### Video Tutorials:
- WPBeginner: https://www.wpbeginner.com/
- WPCrafter: https://www.youtube.com/c/WPCrafter

---

## 💰 Cost Estimate

### DIY Conversion:
- **Time**: 10-15 hours
- **Cost**: $0 (your time only)

### Hire Developer:
- **Freelancer**: $500 - $1,500
- **Agency**: $2,000 - $5,000

### Recommended Approach:
1. Try DIY first with this guide
2. Hire developer only if stuck
3. Budget: $200-500 for help if needed

---

## 🚨 Important Notes

1. **Keep Backup**: Always keep your current HTML site as backup
2. **Test First**: Use local/staging environment before going live
3. **SEO**: Set up 301 redirects from old URLs to new WordPress URLs
4. **Forms**: Test all forms thoroughly after conversion
5. **Images**: Optimize images before uploading to WordPress
6. **Security**: Install security plugin immediately
7. **Updates**: Keep WordPress, themes, and plugins updated

---

## 📞 Need Help?

If you get stuck during conversion:
1. WordPress Support Forums: https://wordpress.org/support/
2. Stack Overflow: https://stackoverflow.com/questions/tagged/wordpress
3. Hire on Fiverr/Upwork: Search "WordPress theme conversion"

---

## ✅ Quick Start Command

```bash
# 1. Create theme folder
mkdir wp-content/themes/aohf-theme

# 2. Copy all your files
cp -r /path/to/aohf-uu/* wp-content/themes/aohf-theme/

# 3. Create required WordPress files
touch wp-content/themes/aohf-theme/functions.php
touch wp-content/themes/aohf-theme/header.php
touch wp-content/themes/aohf-theme/footer.php
touch wp-content/themes/aohf-theme/index.php

# 4. Activate theme in WordPress admin
```

---

**Your website is perfectly structured for WordPress conversion. Follow this guide step by step, and you'll have a fully functional WordPress theme!**

*Estimated Total Time: 8-12 hours for complete conversion*
