import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Mic,
  Camera,
  Brain,
  Cloud,
  Leaf,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Mic className="h-8 w-8 text-primary" />,
      title: t('voiceSupport'),
      description: t('voiceSupportDesc'),
    },
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: t('diseaseDetection'),
      description: t('diseaseDetectionDesc'),
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: t('expertAdvice'),
      description: t('expertAdviceDesc'),
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Weather Insights",
      description: "Real-time weather data and agricultural forecasts for better planning",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Soil Health",
      description: "Comprehensive soil analysis and improvement recommendations",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Government Schemes",
      description: "Access latest subsidies and support schemes for farmers",
    },
  ];

  const stats = [
    //
    { number: '95%', label: 'Accuracy Rate', icon: <Award className="h-5 w-5" /> },
    { number: '24/7', label: 'Support Available', icon: <CheckCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 agricultural-gradient opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('welcomeSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="shadow-button text-lg px-8 py-6">
                <Link to="/register">
                  {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/login">{t('login')}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Agricultural Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to make informed farming decisions, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 animate-float">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 earth-gradient opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Thousands of Smart Farmers
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your journey towards data-driven farming with AI-powered insights and expert guidance.
            </p>
            <Button size="lg" asChild className="shadow-button text-lg px-8 py-6">
              <Link to="/register">
                Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 AgriAdvise. Empowering farmers with AI technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;