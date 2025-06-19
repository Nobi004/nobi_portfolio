from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView, CreateView
from django.contrib import messages
from django.urls import reverse_lazy
from django.db.models import Count
from .models import (
    Profile, SkillCategory, Experience, Project, ProjectTag,
    Education, Certification, BlogPost, Publication
)
from .forms import ContactForm

def home_view(request):
    profile = Profile.objects.first()
    featured_projects = Project.objects.filter(featured=True)[:3]
    recent_posts = BlogPost.objects.all()[:3]
    recent_publications = Publication.objects.filter(featured=True)[:3]
    
    # Get counts for stats
    projects_count = Project.objects.count()
    publications_count = Publication.objects.count()
    experience_years = 0
    if Experience.objects.exists():
        first_exp = Experience.objects.order_by('start_date').first()
        if first_exp:
            from datetime import datetime
            experience_years = datetime.now().year - first_exp.start_date.year
    
    context = {
        'profile': profile,
        'featured_projects': featured_projects,
        'recent_posts': recent_posts,
        'recent_publications': recent_publications,
        'projects_count': projects_count,
        'publications_count': publications_count,
        'experience_years': experience_years,
    }
    return render(request, 'home.html', context)

def about_view(request):
    profile = Profile.objects.first()
    return render(request, 'about.html', {'profile': profile})

def skills_view(request):
    categories = SkillCategory.objects.prefetch_related('skills')
    return render(request, 'skills.html', {'categories': categories})

def experience_view(request):
    experiences = Experience.objects.all()
    return render(request, 'experience.html', {'experiences': experiences})

class ProjectListView(ListView):
    model = Project
    template_name = 'projects.html'
    context_object_name = 'projects'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tags'] = ProjectTag.objects.all()
        return context

def education_view(request):
    education = Education.objects.all()
    certifications = Certification.objects.all()
    
    context = {
        'education': education,
        'certifications': certifications,
    }
    return render(request, 'education.html', context)

class BlogListView(ListView):
    model = BlogPost
    template_name = 'blog.html'
    context_object_name = 'posts'
    paginate_by = 10

class ContactCreateView(CreateView):
    form_class = ContactForm
    template_name = 'contact.html'
    success_url = reverse_lazy('contact')
    
    def form_valid(self, form):
        messages.success(self.request, 'Thank you for your message! I will get back to you soon.')
        return super().form_valid(form)

# NEW: Publications View
def publications_view(request):
    publications = Publication.objects.all()
    years = publications.values_list('year', flat=True).distinct().order_by('-year')
    
    # Get some stats (you can customize these)
    citations_count = 100  # You might want to add a citations field to the model
    conferences_count = publications.values('conference_journal').distinct().count()
    
    context = {
        'publications': publications,
        'years': years,
        'citations_count': citations_count,
        'conferences_count': conferences_count,
    }
    return render(request, 'publications.html', context)