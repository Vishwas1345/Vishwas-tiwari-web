
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart3, Globe, Brain, Database, TrendingUp, Palette, Mail } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  icon: React.ReactNode;
  category: string;
}

const ProjectCard = ({ title, description, tags, imageUrl, icon, category }: ProjectCardProps) => {

  return (
    <Card className="card-hover overflow-hidden bg-card border border-border h-full flex flex-col relative group">
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-primary/10 backdrop-blur-sm p-2 rounded-full border border-primary/20">
          {icon}
        </div>
      </div>
      
      <div className="relative h-52 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
            {category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gradient">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="hover:bg-primary/20 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Super Store's Superb Analytics",
      description: "Comprehensive analysis of a superstore's billing dataset to uncover critical business insights and performance metrics. Performed in-depth exploration of sales patterns, customer behavior, product performance, and regional trends. Identified top-performing categories, seasonal sales variations, and customer segmentation strategies that resulted in actionable recommendations for inventory management and marketing optimization.",
      tags: ["Python", "Data Analytics", "Business Intelligence", "Pandas", "Seaborn", "Statistical Analysis"],
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      category: "Business Analytics"
    },
    {
      title: "Email Sender Pro",
      description: "Email Sender Pro is an efficient and user-friendly application designed to send both bulk and individual emails with ease. Whether you're running a marketing campaign, sending newsletters, or handling routine communications, Email Sender Pro streamlines the process with a live progress tracker that keeps you informed every step of the way.",
      tags: ["Python", "Email Automation", "GUI", "Bulk Emails", "Progress Tracking"],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Mail className="w-5 h-5 text-primary" />,
      category: "Automation"
    },
    {
      title: "Portfolio Website Pro",
      description: "A comprehensive portfolio website built with modern web technologies featuring responsive design, interactive animations, and optimized performance. Showcases projects with dynamic content management and seamless user experience across all devices.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Modern UI"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development"
    },
    {
      title: "Titanic Survival Prediction",
      description: "A comprehensive machine learning model that predicts passenger survival on the Titanic using demographic and ticket information. Implemented advanced feature engineering and achieved 75-80% accuracy using TensorFlow and scikit-learn.",
      tags: ["Python", "Machine Learning", "Data Analysis", "Scikit-Learn", "TensorFlow"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Brain className="w-5 h-5 text-primary" />,
      category: "Machine Learning"
    },
    {
      title: "AI ChatBot",
      description: "An intelligent AI chatbot powered by Google's Gemini AI that provides accurate responses to user queries. Features conversation history, real-time streaming responses, and an intuitive Streamlit interface for seamless user interaction.",
      tags: ["Python", "AI", "Gemini API", "Streamlit"],
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      category: "Artificial Intelligence"
    },
    {
      title: "Cafe Menu Analytics",
      description: "Conducted comprehensive end-to-end analysis of a café's billing dataset to uncover key business insights. Identified top-selling items, revenue trends, and category-wise performance to optimize inventory and marketing strategies.",
      tags: ["Python", "Data Analysis", "Pandas", "Matplotlib", "Business Intelligence"],
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <BarChart3 className="w-5 h-5 text-green-400" />,
      category: "Data Analytics"
    },
    {
      title: "Happy Holidays Explorer",
      description: "Designed and developed a responsive, user-friendly website for Happy Holidays travel agency. Features dynamic tour listings, enquiry forms, image galleries, and modern UI/UX with mobile optimization for enhanced customer experience.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development"
    }
  ];

  return (
    <section id="projects" className="bg-gradient relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my technical skills and problem-solving abilities through real-world applications
          </p>
        </div>
        
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="card-hover bg-card border border-border inline-block">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gradient mb-4">Want to see my projects?</h3>
              <p className="text-muted-foreground mb-6">
                Click the button below to view my projects
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
                onClick={() => window.location.href = '/portfolio'}
              >
                <Mail className="w-4 h-4 mr-2" />
                Click Here
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
