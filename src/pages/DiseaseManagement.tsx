import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bug, Search, Leaf, AlertTriangle, CheckCircle, Camera, Book } from 'lucide-react';

const DiseaseManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const diseases = [
    {
      id: '1',
      name: 'Rice Blast',
      crop: 'Paddy',
      severity: 'high',
      symptoms: 'Brown spots with yellow halos on leaves',
      treatment: 'Apply Tricyclazole fungicide',
      prevention: 'Use resistant varieties, proper drainage'
    },
    {
      id: '2', 
      name: 'Coconut Root Wilt',
      crop: 'Coconut',
      severity: 'high',
      symptoms: 'Yellowing of outer leaves, reduced nut production',
      treatment: 'Root feeding with balanced fertilizer',
      prevention: 'Proper drainage, organic matter addition'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Bug className="h-8 w-8 text-primary" />
              {t('diseaseManagement')}
            </h1>
            <p className="text-muted-foreground">
              Identify, treat, and prevent crop diseases with expert guidance
            </p>
          </div>

          <Card className="shadow-card mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search diseases, symptoms, or crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {diseases.map((disease) => (
              <Card key={disease.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      {disease.name}
                    </CardTitle>
                    <Badge className={getSeverityColor(disease.severity)}>
                      {disease.severity} risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Symptoms
                    </h4>
                    <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Treatment
                    </h4>
                    <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bug className="h-4 w-4 text-blue-500" />
                      Prevention
                    </h4>
                    <p className="text-sm text-muted-foreground">{disease.prevention}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseManagement;