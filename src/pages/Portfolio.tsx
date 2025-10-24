import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Brain, BarChart3, Globe, Database, TrendingUp, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  icon: React.ReactNode;
  category: string;
  accuracy?: string;
  dataset?: string;
  iterations?: string;
}

const ProjectCard = ({ title, description, tags, imageUrl, icon, category, accuracy, dataset, iterations }: ProjectCardProps) => {
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
         <div className="text-muted-foreground mb-4">
           {description.split('\n').map((line, index) => (
             <div key={index} className="mb-1" style={{ marginBottom: '4px' }}>
               {line}
             </div>
           ))}
         </div>
        
        {/* Performance metrics for ML projects */}
        {(accuracy || dataset || iterations) && (
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {accuracy && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-semibold text-primary">{accuracy}</span>
                </div>
              )}
              {dataset && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dataset:</span>
                  <span className="font-semibold text-primary">{dataset}</span>
                </div>
              )}
               {iterations && (
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Iterations:</span>
                   <span className="font-semibold text-primary">{iterations}</span>
                 </div>
               )}
            </div>
          </div>
        )}
        
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

const Portfolio = () => {
  const navigate = useNavigate();

  const machineLearningProjects = [
     {
       title: "Will help you find a computer!",
       description: "• Machine learning regression model for accurate computer price prediction\n• Analyzes comprehensive hardware specs: RAM, GPU, processor, brand, storage\n• Extensive data preprocessing and feature engineering with multiple algorithms\n• Trained on 80,000+ computer configurations from various manufacturers\n• Achieved 83% accuracy in price prediction\n• Real-time price prediction with confidence intervals\n• Detailed breakdown of how each specification affects final price\n• Helps consumers make informed decisions and retailers optimize pricing\n• Supports multiple regression algorithms and model optimization",
       tags: ["Python", "Machine Learning", "Regression", "Scikit-Learn", "Pandas", "NumPy"],
       imageUrl: "/images/3.1.png",
       icon: <Brain className="w-5 h-5 text-primary" />,
       category: "Machine Learning",
       accuracy: "83%",
       dataset: "80k samples"
     },
    {
      title: "Neural Network: How it works!",
      description: "• 3-layer neural network built from scratch using only Python, NumPy, and Pandas\n• Implements forward propagation, backpropagation, and gradient descent algorithms\n• Custom sigmoid activation function and mean squared error loss calculation\n• Classifies handwritten digits (0-9) from MNIST dataset with 85% accuracy\n• 980 training iterations with adaptive learning rate optimization\n• Deep understanding of neural network fundamentals and mathematical concepts\n•Calculus, linear algebra, and optimization algorithms\n• No reliance on high-level frameworks - pure mathematical implementation\n• Excellent demonstration of machine learning theory in practice",
      tags: ["Python", "Neural Networks", "NumPy", "Pandas", "Deep Learning", "Calculus", "Linear Algebra", "Machine Learning"],
      imageUrl: "/images/NNFS.png",
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      category: "Deep Learning",
      accuracy: "85%",
      dataset: "60k samples",
    },
    {
      title: "What's this flower?",
      description: "• Machine learning classification model for flower species identification\n• Analyzes botanical measurements: petal length/width, sepal length/width\n• Expertise in feature engineering and data preprocessing techniques\n• Achieved 93% accuracy using ensemble methods and algorithms\n• Comprehensive data visualization of flower characteristics\n• Feature importance analysis and cross-validation techniques\n• Classifies multiple flower species with high confidence\n• Detailed probability scores for each prediction\n• Practical application in botanical research and environmental studies\n• Valuable for researchers, botanists, and educational purposes",
      tags: ["Python", "Pandas", "Numpy" , "Classification", "Scikit-Learn", "Data Science", "Feature Engineering"],
      imageUrl: "/images/random forrest.png",
      icon: <Brain className="w-5 h-5 text-green-400" />,
      category: "Classification",
      accuracy: "93%",
      dataset: "20k samples"
    },
    {
      title: "Titanic: Why did they sink?",
      description: "• Machine learning classification model for Titanic passenger survival prediction\n• Analyzes demographic info, ticket details, and family relationships\n• Data analysis: missing value imputation, feature engineering\n• Factors: passenger class, age, gender, fare, cabin location, family size\n• Traditional ML algorithms and deep learning with TensorFlow/scikit-learn\n• Extensive exploratory data analysis with statistical visualizations\n• Correlation analysis and survival pattern identification\n• Data preprocessing pipelines and feature selection techniques\n• Model evaluation with confusion matrices and ROC curves\n• Insights into factors influencing survival rates during the tragic event",
      tags: ["Python", "Pandas", "Numpy" , "Matplotlib", "Machine Learning", "Data Analysis", "TensorFlow"],
      imageUrl: "/images/titanic.jpg",
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      category: "Machine Learning",
      accuracy: "75-80%",
      dataset: "800 samples"
    }
  ];

  const dataAnalyticsProjects = [
    {
      title: "Super Store's Superb Analytics",
      description: "• Comprehensive business intelligence analysis of superstore billing dataset\n• Multi-year and multi-regional data spanning extensive time periods\n• Deep-dive exploration of sales patterns and customer purchasing behavior\n• Product performance metrics and regional market trend analysis\n•Statistical techniques: time series, cohort analysis, CLV calculations\n• Identification of top-performing product categories and seasonal variations\n• Customer segmentation strategies and regional performance comparisons\n• Critical insights for inventory management and pricing optimization\n• Interactive data visualization dashboards with charts and heatmaps\n• Actionable recommendations for revenue growth and operational efficiency",
      tags: ["Python", "Data Analytics", "Business Intelligence", "Pandas", "Seaborn", "Statistical Analysis", "Exploratory Data Analysis"],
      imageUrl: "/images/store.png",
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      category: "Business Analytics"
    },
    {
      title: "Mouth watering analytics",
      description: "• Comprehensive data analytics project for café billing dataset analysis\n• Detailed examination of menu item performance and customer ordering patterns\n• Peak hours analysis and revenue optimization opportunities\n• Identification of top-selling menu items and profit margin analysis by category\n• Customer behavior segmentation and seasonal trend identification\n•Data visualization: interactive dashboards and sales heatmaps\n• Customer journey mapping and behavior pattern analysis\n• Statistical methods: correlation analysis, regression modeling, A/B testing\n• Specific recommendations for menu optimization and pricing strategies\n• Staff scheduling and marketing campaign optimization insights\n• Expertise in food service analytics and hospitality industry applications",
      tags: ["Python", "Data Analysis", "Pandas", "Matplotlib", "Business Intelligence", "Seaborn", "Exploratory Data Analysis"],
      imageUrl: "/images/cafe.png",
      icon: <BarChart3 className="w-5 h-5 text-green-400" />,
      category: "Data Analytics"
    }
  ];

  const webDevelopmentProjects = [
    {
      title: "Whatvever I built, is here",
      description: "• Modern portfolio website built with React, TypeScript, and Tailwind CSS\n• Frontend with responsive design and animations\n• Dynamic content management and smooth scrolling navigation\n• Interactive project galleries and real-time animations\n• Component-based architecture and state management\n• Mobile-first design approach and accessibility compliance\n• SEO optimization and cross-browser compatibility\n• Advanced UI/UX elements: gradients, hover effects, loading animations\n• Performance optimization techniques and modern web practices\n• Living demonstration of technical skills and creative design",
      tags: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Modern UI"],
      imageUrl: "/images/port.webp",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development"
    },
    {
      title: "Travel with me",
      description: "• Comprehensive travel agency website for Happy Holidays\n• Complete booking and information system with responsive design\n• Dynamic tour listings with filtering and search capabilities\n• Interactive image galleries with lightbox functionality\n• Online enquiry forms with validation and real-time availability\n• Frontend technologies: HTML5, CSS3, JavaScript ES6+\n• Mobile-first design and cross-browser compatibility\n• SEO optimization and accessibility compliance\n• Advanced UI/UX: smooth animations, interactive maps\n• Customer testimonials and social media integration\n• Complete digital solution for travel agencies",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
      imageUrl: "/images/travel.jpg",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development"
    }
  ];

  const extraProjects = [
    {
      title: "Send emails with ease",
      description: "• Email Sender Pro - comprehensive email automation application\n• Intuitive GUI for managing bulk and individual email campaigns\n• Email template management and recipient list segmentation\n• Scheduling capabilities and real-time progress tracking\n• Support for multiple email providers and HTML/plain text formatting\n• Attachment handling and personalized email content\n• Email validation, bounce handling, and delivery status tracking\n• Comprehensive reporting dashboards and analytics\n• Object-oriented design and database integration\n• Threading for concurrent operations and error handling\n• Valuable for marketing professionals and small businesses",
      tags: ["Python", "Email Automation", "GUI", "Bulk Emails", "Progress Tracking"],
      imageUrl: "/images/Email sender pro.jpg",
      icon: <Mail className="w-5 h-5 text-primary" />,
      category: "Automation"
    },
    {
      title: "AI ChatBot(Using Gemini API)",
      description: "• An AI-powered chatbot using Google's Gemini API\n• Conversation capabilities and modern web interface\n• Real-time conversation handling and context-aware responses\n• Conversation history management and streaming response capabilities\n• Clean Streamlit interface with real-time chat functionality\n• Message threading and conversation export options\n• Sentiment analysis and response customization features\n• Conversation analytics and multi-turn dialogue management\n• API integration and asynchronous programming\n• Data persistence and user interface design\n• Adaptable for customer service and educational purposes",
      tags: ["Python", "AI", "Gemini API", "Streamlit"],
      imageUrl: "/images/chatbot.avif",
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      category: "Artificial Intelligence"
    }
  ];

  const ProjectSection = ({ title, projects, icon, description }: { title: string, projects: ProjectCardProps[], icon: React.ReactNode, description: string }) => (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gradient">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Vishwas's Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive showcase of my technical expertise across machine learning, data analytics, web development, and innovative projects
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2 bg-primary/10 border-primary/30 text-primary">
                <Brain className="w-4 h-4 mr-2" />
                Machine Learning
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-green-400/10 border-green-400/30 text-green-400">
                <BarChart3 className="w-4 h-4 mr-2" />
                Data Analytics
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-purple-400/10 border-purple-400/30 text-purple-400">
                <Globe className="w-4 h-4 mr-2" />
                Web Development
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-blue-400/10 border-blue-400/30 text-blue-400">
                <Database className="w-4 h-4 mr-2" />
                Extra Projects
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Sections */}
      <div className="container mx-auto px-4 py-16">
        <ProjectSection
          title="Machine Learning Projects"
          description="Useful Machine learning models and neural networks built from scratch with impressive accuracy rates"
          icon={<Brain className="w-6 h-6 text-primary" />}
          projects={machineLearningProjects}
        />

        <ProjectSection
          title="Data Analytics Projects"
          description="Comprehensive business intelligence and data analysis solutions for real-world problems"
          icon={<BarChart3 className="w-6 h-6 text-green-400" />}
          projects={dataAnalyticsProjects}
        />

        <ProjectSection
          title="Web Development Projects"
          description="Modern, responsive web applications built with cutting-edge technologies"
          icon={<Globe className="w-6 h-6 text-purple-400" />}
          projects={webDevelopmentProjects}
        />

        <ProjectSection
          title="Extra Projects"
          description="Innovative solutions and automation tools that showcase diverse technical skills"
          icon={<Database className="w-6 h-6 text-blue-400" />}
          projects={extraProjects}
        />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="card-hover bg-card border border-border inline-block">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gradient mb-4">Interested in Collaboration?</h3>
              <p className="text-muted-foreground mb-6">
                I'm always excited to work on new projects and explore innovative solutions
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
                onClick={() => navigate('/#contact')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
