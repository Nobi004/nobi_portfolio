# 🚀 AI Engineer Portfolio - Complete Setup Guide

## 📋 Prerequisites
- Python 3.8+
- Django 4.2+
- Virtual environment activated
- Existing Django portfolio project

## 🔧 Step-by-Step Setup

### 1. **Install Additional Dependencies**

First, update your `requirements.txt`:

```txt
Django==4.2.7
Pillow==10.1.0
python-decouple==3.8
whitenoise==6.6.0
gunicorn==21.2.0
dj-database-url==2.1.0
psycopg2-binary==2.9.9
django-widget-tweaks==1.5.0  # For form styling (optional)
```

Install the packages:
```bash
pip install -r requirements.txt
```

### 2. **Update Django Settings**

Add to `ai_portfolio/settings.py`:

```python
# Add widget_tweaks to INSTALLED_APPS (if using)
INSTALLED_APPS = [
    # ... existing apps
    'widget_tweaks',  # Add this if you installed it
]

# Update STATICFILES_DIRS to include new static folders
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'portfolio' / 'static',
]
```

### 3. **Update Models**

Add the Publication model to your existing `portfolio/models.py`:

```python
# Copy the Publication model from the artifact above
# Make sure to import at the top:
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
```

### 4. **Create and Run Migrations**

```bash
# Create migrations for the new Publication model
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### 5. **Update Admin Registration**

Replace your `portfolio/admin.py` with the enhanced version provided above.

### 6. **Add New Templates and Static Files**

Create the following directory structure if it doesn't exist:

```
portfolio/
├── static/
│   ├── css/
│   │   └── ai_portfolio.css  # Copy from artifact
│   └── js/
│       └── ai_animations.js   # Copy from artifact
└── templates/
    ├── base.html             # Replace with enhanced version
    ├── home.html             # Replace with enhanced version
    ├── projects.html         # Replace with enhanced version
    ├── blog.html             # Replace with enhanced version
    ├── contact.html          # Replace with enhanced version
    ├── skills.html           # Replace with enhanced version
    └── publications.html     # New template - copy from artifact
```

### 7. **Update URL Configuration**

Add the publications URL to `portfolio/urls.py`:

```python
path('publications/', views.publications_view, name='publications'),
```

### 8. **Update Views**

Replace your `portfolio/views.py` with the enhanced version that includes the publications view.

### 9. **Collect Static Files**

```bash
python manage.py collectstatic --noinput
```

### 10. **Create Superuser (if not exists)**

```bash
python manage.py createsuperuser
```

### 11. **Load Sample Data (Optional)**

Create a Django management command to load sample data:

Create file: `portfolio/management/commands/load_sample_data.py`

```python
from django.core.management.base import BaseCommand
from portfolio.models import Profile, SkillCategory, Skill, Project, ProjectTag, Publication
from datetime import date

class Command(BaseCommand):
    help = 'Load sample data for AI portfolio'

    def handle(self, *args, **kwargs):
        # Create Profile
        profile, created = Profile.objects.get_or_create(
            name="Your Name",
            defaults={
                'title': 'AI Engineer at OpenAI',
                'tagline': 'Building the future with artificial intelligence',
                'bio': 'Passionate AI engineer with expertise in deep learning...',
                'email': 'your.email@example.com',
                'github_url': 'https://github.com/yourusername',
                'linkedin_url': 'https://linkedin.com/in/yourusername',
            }
        )
        
        # Create Skill Categories
        ml_category, _ = SkillCategory.objects.get_or_create(
            name="Machine Learning",
            defaults={'order': 1}
        )
        
        # Create Skills
        Skill.objects.get_or_create(
            name="TensorFlow",
            category=ml_category,
            defaults={'level': 90, 'icon': 'fab fa-python'}
        )
        
        # Create Project Tags
        ai_tag, _ = ProjectTag.objects.get_or_create(name="AI")
        ml_tag, _ = ProjectTag.objects.get_or_create(name="Machine Learning")
        
        # Create Sample Project
        project, _ = Project.objects.get_or_create(
            title="AI Image Generator",
            defaults={
                'short_description': 'Advanced GAN-based image generation system',
                'github_url': 'https://github.com/yourusername/project',
                'featured': True,
            }
        )
        project.tags.add(ai_tag, ml_tag)
        
        # Create Sample Publication
        Publication.objects.get_or_create(
            title="Deep Learning for Computer Vision: A Comprehensive Survey",
            defaults={
                'authors': 'Your Name, Co-Author Name',
                'conference_journal': 'IEEE Conference on Computer Vision and Pattern Recognition',
                'year': 2024,
                'abstract': 'This paper presents a comprehensive survey...',
                'featured': True,
            }
        )
        
        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))
```

Run the command:
```bash
python manage.py load_sample_data
```

### 12. **Configure Form Styling (If not using widget_tweaks)**

If you don't want to use widget_tweaks, update the contact form template to add classes manually:

Replace in `contact.html`:
```html
{{ form.name|add_class:"form-input-glass" }}
```

With:
```html
<input type="text" name="name" id="id_name" class="form-input-glass" required>
```

### 13. **External Libraries Setup**

Add these CDN links to your base.html if not already present:

```html
<!-- In <head> section -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">

<!-- Before closing </body> -->
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

## 🎨 Customization

### Change Theme Colors

Edit these CSS variables in `ai_portfolio.css`:

```css
:root {
    --ai-primary: #00D9FF;    /* Change primary color */
    --ai-secondary: #FF0080;   /* Change secondary color */
    --ai-accent: #7928CA;      /* Change accent color */
    --ai-dark: #0A0E27;        /* Change dark background */
}
```

### Adjust Animations

Modify animation speeds in `ai_animations.js`:

```javascript
// Particle density
particles: {
    number: {
        value: 80,  // Increase/decrease particles
    }
}

// Cursor trail length
const trailLength = 20;  // Adjust trail length
```

## 🚦 Running the Application

1. **Development Server**
   ```bash
   python manage.py runserver
   ```

2. **Access the site**
   - Main site: http://localhost:8000
   - Admin panel: http://localhost:8000/admin

## 📱 Testing Responsive Design

Test on different devices:
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024 (iPad)
- Mobile: 375x667 (iPhone)

## 🐛 Troubleshooting

### Static Files Not Loading
```bash
python manage.py collectstatic --clear --noinput
```

### Particles.js Not Working
Make sure the particles-js div has proper ID:
```html
<div id="particles-js"></div>
```

### Database Errors
```bash
python manage.py migrate --run-syncdb
```

### Form Styling Issues
If widget_tweaks not working, manually add classes to form fields in templates.

## 🎯 Next Steps

1. **Upload your CV** via Django Admin → Profile → Resume field
2. **Add your projects** via Django Admin → Projects
3. **Add publications** via Django Admin → Publications
4. **Customize content** via Django Admin
5. **Deploy to production** (Heroku, Render, DigitalOcean)

## 📈 Performance Optimization

1. **Enable caching** in production
2. **Compress images** before uploading
3. **Minify CSS/JS** for production
4. **Use CDN** for static files
5. **Enable gzip compression**

## 🔒 Security Checklist

- [ ] Set `DEBUG = False` in production
- [ ] Use environment variables for secrets
- [ ] Configure ALLOWED_HOSTS
- [ ] Set up HTTPS
- [ ] Update security middleware

## 📞 Support

If you encounter any issues:
1. Check Django logs
2. Verify all files are in correct locations
3. Clear browser cache
4. Check console for JavaScript errors

---

**Ready to showcase your AI expertise! 🚀**