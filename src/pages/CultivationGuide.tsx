import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Sprout, Calendar, Droplets, Scissors } from 'lucide-react';

const CultivationGuide = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('paddy');

  const guides = {
    paddy: {
      name: 'Paddy (Rice)',
      stages: [
        { title: 'Land Preparation', duration: '15 days', description: 'Plough field, level ground, prepare nursery beds' },
        { title: 'Sowing/Transplanting', duration: '30-35 days', description: 'Sow seeds in nursery, transplant 30-day old seedlings' },
        { title: 'Vegetative Growth', duration: '40-50 days', description: 'Apply fertilizers, maintain water level, weed control' },
        { title: 'Reproductive Phase', duration: '30-35 days', description: 'Panicle initiation, flowering, grain formation' },
        { title: 'Maturation', duration: '30 days', description: 'Grain filling, field drying before harvest' }
      ]
    },
    coconut: {
      name: 'Coconut',
      stages: [
        { title: 'Site Selection', duration: 'Initial', description: 'Choose well-drained coastal or inland areas' },
        { title: 'Planting', duration: '1 month', description: 'Plant quality seedlings with proper spacing (7.5m x 7.5m)' },
        { title: 'Young Palm Care', duration: '3-5 years', description: 'Regular watering, fertilization, pest management' },
        { title: 'Bearing Stage', duration: '5+ years', description: 'Regular harvesting every 45 days, continuous care' },
        { title: 'Maintenance', duration: 'Ongoing', description: 'Pruning, fertilization, disease monitoring' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              {t('cultivationGuide')}
            </h1>
            <p className="text-muted-foreground">
              Step-by-step cultivation guides for major crops in Tamil Nadu and Kerala
            </p>
          </div>

          <Card className="shadow-card mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Button 
                  variant={selectedCrop === 'paddy' ? 'default' : 'outline'}
                  onClick={() => setSelectedCrop('paddy')}
                >
                  Paddy
                </Button>
                <Button 
                  variant={selectedCrop === 'coconut' ? 'default' : 'outline'}
                  onClick={() => setSelectedCrop('coconut')}
                >
                  Coconut
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                {guides[selectedCrop as keyof typeof guides].name} Cultivation Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guides[selectedCrop as keyof typeof guides].stages.map((stage, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{stage.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {stage.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CultivationGuide;