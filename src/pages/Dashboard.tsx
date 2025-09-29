import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Mic,
  Camera,
  Sprout,
  Cloud,
  TestTube,
  Building,
  Bug,
  BookOpen,
  User,
  MapPin,
  Crop,
  TrendingUp,
  ArrowRight,
  Thermometer,
  Droplets
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const quickActions = [
    {
      title: t('voiceAssistant'),
      description: 'Ask questions using voice',
      icon: <Mic className="h-6 w-6" />,
      link: '/voice-assistant',
      color: 'text-blue-600'
    },
    {
      title: t('imageAnalysis'),
      description: 'Upload crop images for analysis',
      icon: <Camera className="h-6 w-6" />,
      link: '/image-analysis',
      color: 'text-green-600'
    },
    {
      title: t('cropAdvisory'),
      description: 'Get crop recommendations',
      icon: <Sprout className="h-6 w-6" />,
      link: '/crop-advisory',
      color: 'text-emerald-600'
    },
    {
      title: t('weather'),
      description: 'Weather forecast & alerts',
      icon: <Cloud className="h-6 w-6" />,
      link: '/weather',
      color: 'text-sky-600'
    },
  ];

  const additionalServices = [
    {
      title: t('soilHealth'),
      icon: <TestTube className="h-5 w-5" />,
      link: '/soil-health',
    },
    {
      title: t('governmentSchemes'),
      icon: <Building className="h-5 w-5" />,
      link: '/government-schemes',
    },
    {
      title: t('diseaseManagement'),
      icon: <Bug className="h-5 w-5" />,
      link: '/disease-management',
    },
    {
      title: t('cultivationGuide'),
      icon: <BookOpen className="h-5 w-5" />,
      link: '/cultivation-guide',
    },
  ];

  const todayWeather = {
    temp: '28°C',
    humidity: '75%',
    condition: 'Partly Cloudy',
    rainfall: '12mm expected'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Farmer'}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's your agricultural dashboard for today
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {user?.state === 'TN' ? 'Tamil Nadu' : 'Kerala'}
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farmer Profile</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-success/10 p-3 rounded-full">
                  <Crop className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farm Size</p>
                  <p className="font-semibold">{user?.farmSize || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-earth/60 p-3 rounded-full">
                  <Sprout className="h-5 w-5 text-earth-dark" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Main Crops</p>
                  <p className="font-semibold">{user?.mainCrops?.join(', ') || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Link to={action.link}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`${action.color} bg-muted p-3 rounded-lg`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{action.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {action.description}
                          </p>
                          <div className="flex items-center text-primary text-sm font-medium">
                            Start now <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Additional Services */}
            <h3 className="text-xl font-semibold mb-4">More Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalServices.map((service, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <Link to={service.link}>
                    <CardContent className="p-4 text-center">
                      <div className="bg-muted p-3 rounded-lg inline-flex mb-2">
                        {service.icon}
                      </div>
                      <p className="text-sm font-medium">{service.title}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Weather */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Today's Weather
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="font-semibold">{todayWeather.temp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <span className="font-semibold">{todayWeather.humidity}</span>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">{todayWeather.condition}</p>
                  <p className="text-sm font-medium text-primary">{todayWeather.rainfall}</p>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/weather">View Full Forecast</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Today's Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">Monsoon Preparation:</span> Check your drainage systems before the upcoming rains. Ensure proper water flow to prevent waterlogging.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/cultivation-guide">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;