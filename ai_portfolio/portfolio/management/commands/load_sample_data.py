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