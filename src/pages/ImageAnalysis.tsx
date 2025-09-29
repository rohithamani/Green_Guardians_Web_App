import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Eye,
  X
} from 'lucide-react';

interface AnalysisResult {
  diseaseDetected: boolean;
  diseaseName?: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
  prevention: string;
}

const ImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const mockAnalysis = (cropType: string): AnalysisResult => {
    const diseases = [
      {
        diseaseDetected: true,
        diseaseName: 'Brown Leaf Spot',
        confidence: 85,
        severity: 'medium' as const,
        description: 'A fungal disease affecting rice leaves, causing brown spots with yellow halos.',
        treatment: 'Apply copper-based fungicides. Remove infected leaves. Improve drainage and reduce leaf wetness.',
        prevention: 'Use resistant varieties. Maintain proper plant spacing. Avoid overhead irrigation.'
      },
      {
        diseaseDetected: true,
        diseaseName: 'Coconut Leaf Blight',
        confidence: 92,
        severity: 'high' as const,
        description: 'A serious fungal infection causing premature leaf death in coconut palms.',
        treatment: 'Spray with Bordeaux mixture or copper sulfate. Remove and burn infected fronds.',
        prevention: 'Ensure proper drainage. Apply organic manure. Use disease-free seedlings.'
      },
      {
        diseaseDetected: false,
        diseaseName: 'Healthy Plant',
        confidence: 95,
        severity: 'low' as const,
        description: 'The plant appears healthy with no visible signs of disease or pest damage.',
        treatment: 'Continue current care practices. Monitor regularly for any changes.',
        prevention: 'Maintain good agricultural practices. Regular fertilization and proper irrigation.'
      }
    ];

    return Math.random() > 0.3 ? diseases[Math.floor(Math.random() * diseases.length)] : {
      diseaseDetected: false,
      confidence: 98,
      severity: 'low' as const,
      description: 'No disease detected. The crop appears healthy.',
      treatment: 'No treatment required. Continue regular monitoring.',
      prevention: 'Maintain current care practices for optimal plant health.'
    };
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const result = mockAnalysis(cropType);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Image has been successfully analyzed for diseases.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
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
              <Camera className="h-8 w-8 text-primary" />
              {t('imageAnalysis')}
            </h1>
            <p className="text-muted-foreground">
              Upload crop images for AI-powered disease detection and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload Section */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Crop Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!imagePreview ? (
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Drop your image here</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <Button variant="outline">
                        Select Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Selected crop"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Change Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type (Optional)</Label>
                    <Input
                      id="cropType"
                      placeholder="e.g., Paddy, Coconut, Groundnut"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Symptoms/Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe any symptoms you've observed..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={analyzeImage}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full shadow-button"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            <div>
              {analysisResult ? (
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {analysisResult.confidence}%
                      </div>
                      <p className="text-sm text-muted-foreground">Confidence Score</p>
                    </div>

                    {/* Disease Status */}
                    <div className={`p-4 rounded-lg ${getSeverityColor(analysisResult.severity)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {getSeverityIcon(analysisResult.severity)}
                        <h3 className="font-semibold">
                          {analysisResult.diseaseName || 'Health Status'}
                        </h3>
                      </div>
                      <p className="text-sm">{analysisResult.description}</p>
                    </div>

                    {/* Treatment Recommendations */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Recommended Treatment
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                          {analysisResult.treatment}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Prevention Tips
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                          {analysisResult.prevention}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1">Save Report</Button>
                      <Button variant="outline" className="flex-1">Share Results</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-card">
                  <CardContent className="p-8 text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground">
                      Upload a clear image of your crop and click analyze to get AI-powered disease detection results.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="shadow-card mt-8">
            <CardHeader>
              <CardTitle>Tips for Better Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Clear Images</h4>
                  <p className="text-sm text-muted-foreground">
                    Take clear, well-lit photos showing the affected areas clearly
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Close-up Shots</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on specific symptoms like spots, discoloration, or damage
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Additional Info</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide crop type and symptom details for more accurate results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;