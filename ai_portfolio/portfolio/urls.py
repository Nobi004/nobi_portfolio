from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('skills/', views.skills_view, name='skills'),
    path('experience/', views.experience_view, name='experience'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('education/', views.education_view, name='education'),
    path('blog/', views.BlogListView.as_view(), name='blog'),
    path('contact/', views.ContactCreateView.as_view(), name='contact'),
]