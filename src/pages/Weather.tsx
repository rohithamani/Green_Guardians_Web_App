import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  MapPin,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Search,
  Umbrella,
  CloudSnow
} from 'lucide-react';

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    humidity: number;
    icon: string;
  }>;
  alerts: Array<{
    type: 'warning' | 'watch' | 'advisory';
    title: string;
    description: string;
    expires: string;
  }>;
  farmingAdvice: Array<{
    activity: string;
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const Weather = () => {
  const [location, setLocation] = useState('Coimbatore, Tamil Nadu');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  // Mock weather data
  const mockWeatherData: WeatherData = {
    location: 'Coimbatore, Tamil Nadu',
    current: {
      temperature: 29,
      condition: 'Partly Cloudy',
      humidity: 78,
      windSpeed: 12,
      visibility: 8,
      uvIndex: 7,
      icon: 'partly-cloudy'
    },
    forecast: [
      {
        date: 'Today',
        high: 32,
        low: 24,
        condition: 'Partly Cloudy',
        precipitation: 20,
        humidity: 75,
        icon: 'partly-cloudy'
      },
      {
        date: 'Tomorrow',
        high: 28,
        low: 22,
        condition: 'Light Rain',
        precipitation: 80,
        humidity: 85,
        icon: 'light-rain'
      },
      {
        date: 'Thu',
        high: 26,
        low: 20,
        condition: 'Heavy Rain',
        precipitation: 95,
        humidity: 90,
        icon: 'heavy-rain'
      },
      {
        date: 'Fri',
        high: 30,
        low: 23,
        condition: 'Cloudy',
        precipitation: 40,
        humidity: 70,
        icon: 'cloudy'
      },
      {
        date: 'Sat',
        high: 33,
        low: 25,
        condition: 'Sunny',
        precipitation: 10,
        humidity: 65,
        icon: 'sunny'
      },
      {
        date: 'Sun',
        high: 34,
        low: 26,
        condition: 'Hot',
        precipitation: 5,
        humidity: 60,
        icon: 'sunny'
      },
      {
        date: 'Mon',
        high: 31,
        low: 24,
        condition: 'Partly Cloudy',
        precipitation: 25,
        humidity: 70,
        icon: 'partly-cloudy'
      }
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Heavy Rain Warning',
        description: 'Heavy rainfall expected on Thursday. Farmers should postpone pesticide applications and prepare drainage systems.',
        expires: '2024-01-03T18:00:00Z'
      },
      {
        type: 'advisory',
        title: 'Heat Wave Advisory',
        description: 'High temperatures expected over the weekend. Increase irrigation frequency and provide shade for livestock.',
        expires: '2024-01-06T20:00:00Z'
      }
    ],
    farmingAdvice: [
      {
        activity: 'Irrigation',
        recommendation: 'Reduce watering before expected rain on Thursday',
        priority: 'high'
      },
      {
        activity: 'Pest Control',
        recommendation: 'Avoid spraying pesticides during rain period',
        priority: 'high'
      },
      {
        activity: 'Harvesting',
        recommendation: 'Complete harvesting before Thursday rain',
        priority: 'medium'
      },
      {
        activity: 'Fertilization',
        recommendation: 'Good time for fertilizer application before rain',
        priority: 'medium'
      },
      {
        activity: 'Planting',
        recommendation: 'Ideal conditions for rice transplanting after rain',
        priority: 'low'
      }
    ]
  };

  useEffect(() => {
    // Auto-load weather data on component mount
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setIsLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-600" />;
      case 'light-rain':
      case 'heavy-rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-red-200 bg-red-50 text-red-800';
      case 'watch': return 'border-orange-200 bg-orange-50 text-orange-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Cloud className="h-8 w-8 text-primary" />
              {t('weather')}
            </h1>
            <p className="text-muted-foreground">
              Real-time weather data and agricultural forecasts for better farming decisions
            </p>
          </div>

          {/* Location Search */}
          <Card className="shadow-card mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter your location (e.g., Coimbatore, Tamil Nadu)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={fetchWeatherData}
                  disabled={isLoading}
                  className="shadow-button"
                >
                  {isLoading ? (
                    <Search className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Get Weather
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {weatherData && (
            <div className="space-y-8">
              {/* Current Weather */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Current Weather - {weatherData.location}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Main Weather */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <div className="text-center">
                        <div className="mb-4">
                          {getWeatherIcon(weatherData.current.icon)}
                        </div>
                        <div className="text-4xl font-bold mb-2">
                          {weatherData.current.temperature}°C
                        </div>
                        <p className="text-muted-foreground">
                          {weatherData.current.condition}
                        </p>
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-3">
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                          <p className="font-semibold">{weatherData.current.humidity}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Wind Speed</p>
                          <p className="font-semibold">{weatherData.current.windSpeed} km/h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Eye className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Visibility</p>
                          <p className="font-semibold">{weatherData.current.visibility} km</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Sun className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">UV Index</p>
                          <p className="font-semibold">{weatherData.current.uvIndex}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alerts */}
              {weatherData.alerts.length > 0 && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Weather Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{alert.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 7-Day Forecast */}
                <div className="lg:col-span-2">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        7-Day Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {weatherData.forecast.map((day, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-20 text-sm font-medium">
                                {day.date}
                              </div>
                              <div className="flex items-center gap-2">
                                {getWeatherIcon(day.icon)}
                                <span className="text-sm">{day.condition}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2 text-sm">
                                <Umbrella className="h-4 w-4 text-blue-500" />
                                {day.precipitation}%
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                {day.humidity}%
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{day.high}°</div>
                                <div className="text-sm text-muted-foreground">{day.low}°</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Farming Advice */}
                <div>
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Farming Advice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {weatherData.farmingAdvice.map((advice, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{advice.activity}</h4>
                            <Badge className={getPriorityColor(advice.priority)}>
                              {advice.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {advice.recommendation}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;