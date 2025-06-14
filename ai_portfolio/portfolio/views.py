from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView, CreateView
from django.contrib import messages
from django.urls import reverse_lazy
from .models import (
    Profile, SkillCategory, Experience, Project, ProjectTag,
    Education, Certification, BlogPost
)
from .forms import ContactForm

def home_view(request):
    profile = Profile.objects.first()
    featured_projects = Project.objects.filter(featured=True)[:3]
    recent_posts = BlogPost.objects.all()[:3]
    
    context = {
        'profile': profile,
        'featured_projects': featured_projects,
        'recent_posts': recent_posts,
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