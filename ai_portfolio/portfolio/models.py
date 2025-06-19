from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='cv/', blank=True, null=True)
    resume = models.FileField(upload_to='resume/', blank=True, null=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Profile"

class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Skill Categories"

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class")
    level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Skill level from 1 to 100"
    )
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.name} ({self.category.name})"
    
    class Meta:
        ordering = ['order', 'name']

class Experience(models.Model):
    job_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    company_logo = models.ImageField(upload_to='companies/', blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    location = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    bullet_points = models.TextField(help_text="Enter each bullet point on a new line")
    
    def __str__(self):
        return f"{self.job_title} at {self.company_name}"
    
    class Meta:
        ordering = ['-start_date']
        verbose_name_plural = "Experiences"

class ProjectTag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    detailed_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    tags = models.ManyToManyField(ProjectTag, blank=True)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-featured', 'order', '-id']

class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    institution_logo = models.ImageField(upload_to='education/', blank=True, null=True)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.degree} - {self.institution}"
    
    class Meta:
        ordering = ['-start_year']
        verbose_name_plural = "Education"

class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='certifications/', blank=True, null=True)
    issue_date = models.DateField()
    expiry_date = models.DateField(blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.issuing_organization}"
    
    class Meta:
        ordering = ['-issue_date']

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField(max_length=500)
    publication_platform = models.CharField(max_length=100)
    publication_date = models.DateField()
    external_url = models.URLField()
    tags = models.ManyToManyField(ProjectTag, blank=True)
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-publication_date']

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message from {self.name} - {self.created_at.strftime('%Y-%m-%d')}"
    
    class Meta:
        ordering = ['-created_at']

class Publication(models.Model):
    title = models.CharField(max_length=300)
    authors = models.CharField(max_length=500, help_text="Comma-separated list of authors")
    conference_journal = models.CharField(max_length=200, help_text="Conference or Journal name")
    year = models.IntegerField()
    abstract = models.TextField(blank=True)
    pdf_file = models.FileField(upload_to='publications/', blank=True, null=True)
    doi_url = models.URLField(blank=True, help_text="DOI or external link")
    arxiv_url = models.URLField(blank=True, help_text="ArXiv link")
    tags = models.ManyToManyField(ProjectTag, blank=True)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"
    
    class Meta:
        ordering = ['-year', 'order', 'title']