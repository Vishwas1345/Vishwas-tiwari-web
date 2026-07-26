import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioPlexusCanvas } from '@/components/PortfolioPlexusCanvas';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, Globe, Database, TrendingUp, Mail, ArrowLeft, Github, Sparkles, Code2, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

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
  url?: string;
}

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};

const gridStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardRise: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionHeader: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slow-drifting decorative icon for the hero backdrop. */
const FloatingIcon = ({
  children,
  className,
  duration = 7,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none text-primary/20 hidden md:block ${className ?? ''}`}
    animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    aria-hidden
  >
    {children}
  </motion.div>
);

const ProjectCard = ({ title, description, tags, imageUrl, icon, category, accuracy, dataset, iterations, url }: ProjectCardProps) => {
  return (
    <div className="h-full">
      <Card className="card-hover overflow-hidden bg-card border border-border h-full flex flex-col relative group">
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className="bg-primary/10 backdrop-blur-sm p-2 rounded-full border border-primary/20"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {icon}
          </motion.div>
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
          {url && (
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-black/80 hover:scale-105 transition-all duration-300"
                aria-label={`View ${title} on GitHub`}
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">Code</span>
              </button>
            </div>
          )}
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
              <Badge key={index} variant="secondary" className="hover:bg-primary/20 hover:scale-105 transition-all">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Portfolio = () => {
  const navigate = useNavigate();

  const machineLearningProjects = [
     {
       title: "Computer price prediction",
       description: "• Machine learning regression model for accurate computer price prediction\n• Analyzes comprehensive hardware specs: RAM, GPU, processor, brand, storage\n• Extensive data preprocessing and feature engineering with multiple algorithms\n• Trained on 80,000+ computer configurations from various manufacturers\n• Achieved 83% accuracy in price prediction\n• Real-time price prediction with confidence intervals\n• Detailed breakdown of how each specification affects final price\n• Helps consumers make informed decisions and retailers optimize pricing\n• Supports multiple regression algorithms and model optimization",
       tags: ["Python", "Machine Learning", "Regression", "Scikit-Learn", "Pandas", "NumPy"],
       imageUrl: "/images/3.1.png",
       icon: <Brain className="w-5 h-5 text-primary" />,
       category: "Machine Learning - Linear Regression",
       accuracy: "83%",
       dataset: "80k samples",
       url: "https://github.com/Vishhhfr/Computer-price-prediction"
     },
    {
      title: "Handwritten digits classificaion",
      description: "• 3-layer neural network built from scratch using only Python, NumPy, and Pandas\n• Implements forward propagation, backpropagation, and gradient descent algorithms\n• Custom ReLu activation function and mean squared error loss calculation\n• Classifies handwritten digits (0-9) from MNIST dataset with 85% accuracy\n• 980 training iterations with adaptive learning rate optimization\n• Deep understanding of neural network fundamentals and mathematical concepts\n•Calculus, linear algebra, and optimization algorithms\n• No reliance on high-level frameworks - pure mathematical implementation\n• Excellent demonstration of machine learning theory in practice",
      tags: ["Python", "Neural Networks", "NumPy", "Pandas", "Deep Learning", "Calculus", "Linear Algebra", "Machine Learning"],
      imageUrl: "/images/NNFS.png",
      icon: <Brain className="w-5 h-5 text-highlight" />,
      category: "Deep Learning - Neural Networks",
      accuracy: "85%",
      dataset: "60k samples",
      url: "https://github.com/Vishhhfr/Neural-Network-model-from-scratch"
    },
    {
       title: "Gold price prediction",
       description: "• Machine learning regression model for gold price prediction.\n• Analyzes historical data including SPX, USO, SLV prices, and EUR/USD exchange rates.\n• Expertise in data preprocessing, correlation analysis, and using ensemble methods like Random Forest Regressor.\n• Achieved high accuracy (98.94%) using the trained model.\n• Includes comprehensive data visualization of price distributions and correlation analysis.\n• Utilizes train/test split for model evaluation and comparison of actual vs. predicted prices.\n• Predicts a continuous value (gold price) with high confidence.\n• Valuable for financial analysis, investment strategies, and economic research.\n• Useful for researchers, financial analysts, investors, and educational purposes.",
       tags: ["Python", "Machine Learning", "Regression", "Scikit-Learn", "Pandas", "NumPy", "Data Visualization"],
       imageUrl: "/images/Gold-price-prediction.avif",
       icon: <Brain className="w-5 h-5 text-primary" />,
       category: "Machine Learning - Random Forest",
       accuracy: "98%",
       dataset: "1600 samples",
       url: "https://github.com/Vishhhfr/Gold-price-prediction"
     },
    {
      title: "Flower species classification",
      description: "• Machine learning classification model for flower species identification\n• Analyzes botanical measurements: petal length/width, sepal length/width\n• Expertise in feature engineering and data preprocessing techniques\n• Achieved 93% accuracy using ensemble methods and algorithms\n• Comprehensive data visualization of flower characteristics\n• Feature importance analysis and cross-validation techniques\n• Classifies multiple flower species with high confidence\n• Detailed probability scores for each prediction\n• Practical application in botanical research and environmental studies\n• Valuable for researchers, botanists, and educational purposes",
      tags: ["Python", "Pandas", "Numpy" , "Classification", "Scikit-Learn", "Data Science", "Feature Engineering"],
      imageUrl: "/images/random forrest.png",
      icon: <Brain className="w-5 h-5 text-green-400" />,
      category: "Machine learning - Random Forest",
      accuracy: "93%",
      dataset: "20k samples",
      url: "https://github.com/Vishhhfr/Flower-species-classification"
    },
    {
      title: "Titanic survival prediction",
      description: "• Machine learning classification model for Titanic passenger survival prediction\n• Analyzes demographic info, ticket details, and family relationships\n• Data analysis: missing value imputation, feature engineering\n• Factors: passenger class, age, gender, fare, cabin location, family size\n• Traditional ML algorithms and deep learning with TensorFlow/scikit-learn\n• Extensive exploratory data analysis with statistical visualizations\n• Correlation analysis and survival pattern identification\n• Data preprocessing pipelines and feature selection techniques\n• Model evaluation with confusion matrices and ROC curves\n• Insights into factors influencing survival rates during the tragic event",
      tags: ["Python", "Pandas", "Numpy" , "Matplotlib", "Machine Learning", "Data Analysis", "TensorFlow"],
      imageUrl: "/images/titanic.jpg",
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      category: "Machine Learning - Linear Regression",
      accuracy: "75-80%",
      dataset: "800 samples",
      url: "https://github.com/Vishhhfr/Titanic-Survival-Prediction"
    }
  ];

  const dataAnalyticsProjects = [
    {
      title: "Super store's analytics",
      description: "• Comprehensive business intelligence analysis of superstore billing dataset\n• Multi-year and multi-regional data spanning extensive time periods\n• Deep-dive exploration of sales patterns and customer purchasing behavior\n• Product performance metrics and regional market trend analysis\n•Statistical techniques: time series, cohort analysis, CLV calculations\n• Identification of top-performing product categories and seasonal variations\n• Customer segmentation strategies and regional performance comparisons\n• Critical insights for inventory management and pricing optimization\n• Interactive data visualization dashboards with charts and heatmaps\n• Actionable recommendations for revenue growth and operational efficiency",
      tags: ["Python", "Data Analytics", "Business Intelligence", "Pandas", "Seaborn", "Statistical Analysis", "Exploratory Data Analysis"],
      imageUrl: "/images/store.png",
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      category: "Business Analytics",
      url: "https://github.com/Vishhhfr/Store-analytics"
    },
    {
      title: "Cafe bill analytics",
      description: "• Comprehensive data analytics project for café billing dataset analysis\n• Detailed examination of menu item performance and customer ordering patterns\n• Peak hours analysis and revenue optimization opportunities\n• Identification of top-selling menu items and profit margin analysis by category\n• Customer behavior segmentation and seasonal trend identification\n•Data visualization: interactive dashboards and sales heatmaps\n• Customer journey mapping and behavior pattern analysis\n• Statistical methods: correlation analysis, regression modeling, A/B testing\n• Specific recommendations for menu optimization and pricing strategies\n• Staff scheduling and marketing campaign optimization insights\n• Expertise in food service analytics and hospitality industry applications",
      tags: ["Python", "Data Analysis", "Pandas", "Matplotlib", "Business Intelligence", "Seaborn", "Exploratory Data Analysis"],
      imageUrl: "/images/cafe.png",
      icon: <BarChart3 className="w-5 h-5 text-green-400" />,
      category: "Data Analytics",
      url: "https://github.com/Vishhhfr/Cafe-bill-analytics"
    }
  ];

  const webDevelopmentProjects = [
    {
      title: "FuelMate",
      description: "• Comprehensive on-demand fuel delivery management system built with the MERN stack\n• Connects customers, fuel stations, and delivery personnel for efficient fuel delivery services\n• Real-time location-based fuel ordering with Mapbox integration\n• User authentication and authorization with JWT and bcrypt\n• Multiple payment options and order tracking system\n• Dashboard with analytics for stations and delivery personnel\n• Route optimization and earnings tracking for delivery personnel\n• Professional logging with Winston (server) and loglevel (client)\n• Email OTP verification using SendGrid for secure registration\n• Google OAuth integration for seamless sign-in\n• Responsive design with Tailwind CSS and shadcn/ui components\n• RESTful API with Express.js and MongoDB database\n• Complete admin panel for user and station management",
      tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Mapbox", "JWT", "Tailwind CSS", "shadcn/ui"],
      imageUrl: "/images/fast_delivery_mobile.png",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Full Stack Web Development",
      url :"https://github.com/Vishwas1345/FuelMate"
    },
    {
      title: "Personal portfolio",
      description: "• Modern portfolio website built with React, TypeScript, and Tailwind CSS\n• Frontend with responsive design and animations\n• Dynamic content management and smooth scrolling navigation\n• Interactive project galleries and real-time animations\n• Component-based architecture and state management\n• Mobile-first design approach and accessibility compliance\n• SEO optimization and cross-browser compatibility\n• Advanced UI/UX elements: gradients, hover effects, loading animations\n• Performance optimization techniques and modern web practices\n• Living demonstration of technical skills and creative design",
      tags: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Modern UI"],
      imageUrl: "/images/port.webp",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development",
    },
    {
      title: "Happy hoildays website",
      description: "• Comprehensive travel agency website for Happy Holidays\n• Complete booking and information system with responsive design\n• Dynamic tour listings with filtering and search capabilities\n• Interactive image galleries with lightbox functionality\n• Online enquiry forms with validation and real-time availability\n• Frontend technologies: HTML5, CSS3, JavaScript ES6+\n• Mobile-first design and cross-browser compatibility\n• SEO optimization and accessibility compliance\n• Advanced UI/UX: smooth animations, interactive maps\n• Customer testimonials and social media integration\n• Complete digital solution for travel agencies",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
      imageUrl: "/images/travel.jpg",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      category: "Web Development",
      url: "https://github.com/Vishhhfr/Happy-Holidays"
    }
  ];

  const extraProjects = [
    {
      title: "Email sender pro",
      description: "• Email Sender Pro - comprehensive email automation application\n• Intuitive GUI for managing bulk and individual email campaigns\n• Email template management and recipient list segmentation\n• Scheduling capabilities and real-time progress tracking\n• Support for multiple email providers and HTML/plain text formatting\n• Attachment handling and personalized email content\n• Email validation, bounce handling, and delivery status tracking\n• Comprehensive reporting dashboards and analytics\n• Object-oriented design and database integration\n• Threading for concurrent operations and error handling\n• Valuable for marketing professionals and small businesses",
      tags: ["Python", "Email Automation", "GUI", "Bulk Emails", "Progress Tracking"],
      imageUrl: "/images/Email sender pro.jpg",
      icon: <Mail className="w-5 h-5 text-primary" />,
      category: "Automation",
      url: "https://github.com/Vishhhfr/Email-sender-pro"
    },
    {
      title: "AI ChatBot(Using Gemini API)",
      description: "• An AI-powered chatbot using Google's Gemini API\n• Conversation capabilities and modern web interface\n• Real-time conversation handling and context-aware responses\n• Conversation history management and streaming response capabilities\n• Clean Streamlit interface with real-time chat functionality\n• Message threading and conversation export options\n• Sentiment analysis and response customization features\n• Conversation analytics and multi-turn dialogue management\n• API integration and asynchronous programming\n• Data persistence and user interface design\n• Adaptable for customer service and educational purposes",
      tags: ["Python", "AI", "Gemini API", "Streamlit"],
      imageUrl: "/images/chatbot.avif",
      icon: <Brain className="w-5 h-5 text-highlight" />,
      category: "Artificial Intelligence"
    }
  ];

  const ProjectSection = ({ title, projects, icon, description }: { title: string, projects: ProjectCardProps[], icon: React.ReactNode, description: string }) => (
    <section className="mb-16">
      <motion.div
        className="flex items-center gap-3 mb-8"
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          className="bg-primary/10 p-3 rounded-lg border border-primary/20"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold text-gradient">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={gridStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={cardRise}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden relative">
      <PortfolioPlexusCanvas />
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <FloatingIcon className="top-28 left-[8%]" duration={7}>
            <Brain className="w-10 h-10" />
          </FloatingIcon>
          <FloatingIcon className="top-40 right-[10%]" duration={9} delay={0.8}>
            <Code2 className="w-12 h-12" />
          </FloatingIcon>
          <FloatingIcon className="bottom-16 left-[16%]" duration={8} delay={1.6}>
            <Cpu className="w-8 h-8" />
          </FloatingIcon>
          <FloatingIcon className="bottom-24 right-[18%]" duration={6.5} delay={0.4}>
            <Sparkles className="w-9 h-9" />
          </FloatingIcon>

          <div className="container mx-auto px-4 relative">
            <motion.div variants={heroStagger} initial="hidden" animate="visible">
              <motion.div variants={heroItem} className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </motion.div>

              <div className="text-center max-w-4xl mx-auto">
                <motion.h1 variants={heroItem} className="text-5xl md:text-6xl font-bold text-gradient mb-6">
                  Vishwas's Portfolio
                </motion.h1>
                <motion.p variants={heroItem} className="text-xl text-muted-foreground mb-8">
                  A comprehensive showcase of my technical expertise across machine learning, data analytics, web development, and innovative projects
                </motion.p>

                <motion.div variants={heroStagger} className="flex flex-wrap justify-center gap-4">
                  <motion.div variants={badgePop} whileHover={{ scale: 1.08, y: -2 }}>
                    <Badge variant="outline" className="px-4 py-2 bg-primary/10 border-primary/30 text-primary">
                      <Brain className="w-4 h-4 mr-2" />
                      Machine Learning
                    </Badge>
                  </motion.div>
                  <motion.div variants={badgePop} whileHover={{ scale: 1.08, y: -2 }}>
                    <Badge variant="outline" className="px-4 py-2 bg-green-400/10 border-green-400/30 text-green-400">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Data Analytics
                    </Badge>
                  </motion.div>
                  <motion.div variants={badgePop} whileHover={{ scale: 1.08, y: -2 }}>
                    <Badge variant="outline" className="px-4 py-2 bg-purple-400/10 border-purple-400/30 text-purple-400">
                      <Globe className="w-4 h-4 mr-2" />
                      Web Development
                    </Badge>
                  </motion.div>
                  <motion.div variants={badgePop} whileHover={{ scale: 1.08, y: -2 }}>
                    <Badge variant="outline" className="px-4 py-2 bg-highlight/12 border-highlight/35 text-highlight">
                      <Database className="w-4 h-4 mr-2" />
                      Extra Projects
                    </Badge>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
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
            icon={<Database className="w-6 h-6 text-highlight" />}
            projects={extraProjects}
          />

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="card-hover bg-card border border-border inline-block">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gradient mb-4">Interested in Collaboration?</h3>
                <p className="text-muted-foreground mb-6">
                  I'm always excited to work on new projects and explore innovative solutions
                </p>
                <Button
                  className="bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90"
                  onClick={() => {
                    navigate('/');
                    // Small delay to ensure the page loads before scrolling
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
