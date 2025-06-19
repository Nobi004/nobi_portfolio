from django.contrib import admin
from .models import (
    Profile, SkillCategory, Skill, Experience, 
    ProjectTag, Project, Education, Certification, 
    BlogPost, ContactMessage, Publication
)

# Customize admin site header
admin.site.site_header = "AI Engineer Portfolio Admin"
admin.site.site_title = "AI Portfolio Admin"
admin.site.index_title = "Welcome to AI Portfolio Management"

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'title', 'tagline', 'email', 'phone', 'location')
        }),
        ('About', {
            'fields': ('bio', 'profile_picture')
        }),
        ('Files', {
            'fields': ('resume',),
            'description': 'Upload your CV/Resume in PDF format'
        }),
        ('Social Links', {
            'fields': ('github_url', 'linkedin_url', 'twitter_url')
        }),
    )

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level', 'order']
    list_filter = ['category']
    list_editable = ['level', 'order']
    search_fields = ['name']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['job_title', 'company_name', 'start_date', 'is_current']
    list_filter = ['is_current', 'start_date']
    search_fields = ['job_title', 'company_name']
    fieldsets = (
        ('Position', {
            'fields': ('job_title', 'company_name', 'company_logo')
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Details', {
            'fields': ('location', 'description', 'bullet_points')
        }),
    )

@admin.register(ProjectTag)
class ProjectTagAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'order', 'get_tags']
    list_filter = ['featured', 'tags']
    list_editable = ['featured', 'order']
    filter_horizontal = ['tags']
    search_fields = ['title', 'short_description']
    fieldsets = (
        ('Project Info', {
            'fields': ('title', 'short_description', 'detailed_description', 'image')
        }),
        ('Links', {
            'fields': ('github_url', 'demo_url')
        }),
        ('Settings', {
            'fields': ('tags', 'featured', 'order')
        }),
    )
    
    def get_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])
    get_tags.short_description = 'Tags'

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_year']
    search_fields = ['degree', 'institution']

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuing_organization', 'issue_date']
    list_filter = ['issue_date']
    search_fields = ['title', 'issuing_organization']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'publication_platform', 'publication_date']
    list_filter = ['publication_platform', 'tags', 'publication_date']
    filter_horizontal = ['tags']
    search_fields = ['title', 'summary']
    date_hierarchy = 'publication_date'

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['title', 'year', 'conference_journal', 'featured', 'order']
    list_filter = ['year', 'featured', 'tags']
    list_editable = ['featured', 'order']
    filter_horizontal = ['tags']
    search_fields = ['title', 'authors', 'conference_journal', 'abstract']
    fieldsets = (
        ('Publication Info', {
            'fields': ('title', 'authors', 'conference_journal', 'year')
        }),
        ('Content', {
            'fields': ('abstract',),
            'classes': ('wide',)
        }),
        ('Files & Links', {
            'fields': ('pdf_file', 'doi_url', 'arxiv_url'),
            'description': 'Upload PDF or provide external links'
        }),
        ('Settings', {
            'fields': ('tags', 'featured', 'order')
        }),
    )

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    date_hierarchy = 'created_at'
    
    def has_add_permission(self, request):
        return False
    
    fieldsets = (
        ('Message Details', {
            'fields': ('name', 'email', 'subject', 'message', 'created_at')
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
    )