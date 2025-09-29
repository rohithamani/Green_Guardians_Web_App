import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Building,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Tractor,
  Sprout,
  Home,
  Zap
} from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  state: 'TN' | 'KL' | 'Central';
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'equipment' | 'infrastructure';
  amount: string;
  eligibility: string[];
  documents: string[];
  applicationProcess: string;
  deadline: string;
  description: string;
  benefits: string[];
  contactInfo: {
    department: string;
    phone: string;
    email: string;
    website: string;
  };
  status: 'active' | 'upcoming' | 'closed';
}

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { user } = useAuth();

  const schemesData: Scheme[] = [
    {
      id: '1',
      title: 'PM-KISAN Samman Nidhi',
      state: 'Central',
      category: 'subsidy',
      amount: '₹6,000 per year',
      eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares', 'Valid Aadhaar card'],
      documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records', 'Phone Number'],
      applicationProcess: 'Apply online through PM-KISAN portal or visit nearest Common Service Center',
      deadline: 'Ongoing - No deadline',
      description: 'Income support scheme providing ₹6,000 per year to small and marginal farmer families',
      benefits: ['₹2,000 in three equal installments', 'Direct bank transfer', 'No intermediaries'],
      contactInfo: {
        department: 'Department of Agriculture & Farmers Welfare',
        phone: '155261',
        email: 'pmkisan-ict@gov.in',
        website: 'https://pmkisan.gov.in'
      },
      status: 'active'
    },
    {
      id: '2',
      title: 'Tamil Nadu Farmers Producer Organizations Support',
      state: 'TN',
      category: 'subsidy',
      amount: '₹15 lakh to ₹2 crore',
      eligibility: ['Registered FPOs in Tamil Nadu', 'Minimum 300 farmer members', 'At least 3 years operation'],
      documents: ['FPO Registration Certificate', 'Member List', 'Audited Financial Statements', 'Business Plan'],
      applicationProcess: 'Submit application through Tamil Nadu Agricultural Marketing Department',
      deadline: 'March 31, 2024',
      description: 'Financial assistance for Farmer Producer Organizations to strengthen agricultural marketing',
      benefits: ['Working capital support', 'Infrastructure development', 'Market linkage assistance'],
      contactInfo: {
        department: 'Tamil Nadu Agricultural Marketing Department',
        phone: '044-28511234',
        email: 'tnagrimarketing@tn.gov.in',
        website: 'https://www.tn.gov.in/agriculture'
      },
      status: 'active'
    },
    {
      id: '3',
      title: 'Kerala Coconut Development Board Scheme',
      state: 'KL',
      category: 'subsidy',
      amount: '₹5,000 to ₹25,000',
      eligibility: ['Coconut farmers in Kerala', 'Minimum 10 coconut palms', 'Valid land documents'],
      documents: ['Land Ownership Certificate', 'Farmer ID Card', 'Bank Account Details', 'Survey Number'],
      applicationProcess: 'Apply through Kerala Coconut Development Board offices',
      deadline: 'December 15, 2024',
      description: 'Subsidy for coconut cultivation, processing equipment and palm care',
      benefits: ['Fertilizer subsidy', 'Equipment purchase support', 'Technical assistance'],
      contactInfo: {
        department: 'Kerala Coconut Development Board',
        phone: '0484-2376265',
        email: 'info@coconutboard.gov.in',
        website: 'https://coconutboard.gov.in'
      },
      status: 'active'
    },
    {
      id: '4',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      state: 'Central',
      category: 'insurance',
      amount: 'Premium: 2% (Kharif), 1.5% (Rabi)',
      eligibility: ['All farmers including sharecroppers', 'Notified crops in notified areas', 'Seasonal cultivation'],
      documents: ['Aadhaar Card', 'Bank Account', 'Sowing Certificate', 'Land Records'],
      applicationProcess: 'Apply through insurance companies, banks, or online portal',
      deadline: 'Varies by crop season',
      description: 'Crop insurance scheme providing coverage against crop loss due to natural calamities',
      benefits: ['Risk coverage for crops', 'Low premium rates', 'Quick claim settlement'],
      contactInfo: {
        department: 'Ministry of Agriculture & Farmers Welfare',
        phone: '011-23382651',
        email: 'pmfby@gov.in',
        website: 'https://pmfby.gov.in'
      },
      status: 'active'
    },
    {
      id: '5',
      title: 'Tamil Nadu Drip Irrigation Subsidy',
      state: 'TN',
      category: 'infrastructure',
      amount: '90% subsidy (Max ₹1.25 lakh/ha)',
      eligibility: ['Farmers with confirmed water source', 'Minimum 0.5 hectare land', 'Suitable crops'],
      documents: ['Land Documents', 'Water Source Certificate', 'Estimate from Approved Vendor', 'Bank Account'],
      applicationProcess: 'Apply through Agricultural Engineering Department offices',
      deadline: 'February 28, 2024',
      description: 'Subsidy for installation of drip irrigation systems to promote water conservation',
      benefits: ['90% cost subsidy', 'Water conservation', 'Increased crop yield', 'Technical support'],
      contactInfo: {
        department: 'Agricultural Engineering Department, TN',
        phone: '044-28527040',
        email: 'tnagrieng@tn.gov.in',
        website: 'https://www.tn.gov.in/aed'
      },
      status: 'active'
    },
    {
      id: '6',
      title: 'Kerala Spices Development Programme',
      state: 'KL',
      category: 'subsidy',
      amount: '₹20,000 to ₹50,000 per hectare',
      eligibility: ['Spice cultivators in Kerala', 'Minimum 0.25 hectare area', 'Approved spice varieties'],
      documents: ['Cultivation Certificate', 'Land Records', 'Farmer Registration', 'Bank Details'],
      applicationProcess: 'Submit application through Kerala Spices Board regional offices',
      deadline: 'June 30, 2024',
      description: 'Financial assistance for spice cultivation including pepper, cardamom, and vanilla',
      benefits: ['Planting material subsidy', 'Irrigation support', 'Processing equipment', 'Market linkage'],
      contactInfo: {
        department: 'Kerala Spices Board',
        phone: '0484-2333610',
        email: 'spicesboard@kerala.gov.in',
        website: 'https://spicesboard.gov.in'
      },
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setSchemes(schemesData);
      setFilteredSchemes(schemesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = schemes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply state filter
    if (stateFilter) {
      filtered = filtered.filter(scheme => scheme.state === stateFilter);
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(scheme => scheme.category === categoryFilter);
    }

    setFilteredSchemes(filtered);
  }, [searchTerm, stateFilter, categoryFilter, schemes]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'loan': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'insurance': return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'training': return <Users className="h-5 w-5 text-orange-500" />;
      case 'equipment': return <Tractor className="h-5 w-5 text-gray-500" />;
      case 'infrastructure': return <Home className="h-5 w-5 text-indigo-500" />;
      default: return <Sprout className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'TN': return 'bg-orange-100 text-orange-800';
      case 'KL': return 'bg-green-100 text-green-800';
      case 'Central': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <Building className="h-8 w-8 text-primary" />
              {t('governmentSchemes')}
            </h1>
            <p className="text-muted-foreground">
              Explore government subsidies, loans, and support schemes for farmers in Tamil Nadu and Kerala
            </p>
          </div>

          {/* Filters */}
          <Card className="shadow-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    <SelectItem value="TN">Tamil Nadu</SelectItem>
                    <SelectItem value="KL">Kerala</SelectItem>
                    <SelectItem value="Central">Central Government</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="subsidy">Subsidies</SelectItem>
                    <SelectItem value="loan">Loans</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStateFilter('');
                    setCategoryFilter('');
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{schemes.length}</div>
                <p className="text-sm text-muted-foreground">Total Schemes</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {schemes.filter(s => s.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Active Schemes</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {schemes.filter(s => s.state === user?.state).length}
                </div>
                <p className="text-sm text-muted-foreground">For Your State</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {schemes.filter(s => s.category === 'subsidy').length}
                </div>
                <p className="text-sm text-muted-foreground">Subsidies</p>
              </CardContent>
            </Card>
          </div>

          {/* Schemes List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading schemes...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Available Schemes</h2>
                <Badge variant="outline">{filteredSchemes.length} schemes found</Badge>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.id} className="shadow-card hover:shadow-elegant transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getCategoryIcon(scheme.category)}
                            <CardTitle className="text-xl">{scheme.title}</CardTitle>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStateColor(scheme.state)}>
                              {scheme.state === 'Central' ? 'Central Govt' : 
                               scheme.state === 'TN' ? 'Tamil Nadu' : 'Kerala'}
                            </Badge>
                            <Badge className={getStatusColor(scheme.status)}>
                              {scheme.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {scheme.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary mb-1">
                            {scheme.amount}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {scheme.deadline}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground">{scheme.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Eligibility */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Eligibility Criteria
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {scheme.eligibility.map((criteria, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Required Documents */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            Required Documents
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {scheme.documents.map((doc, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-500" />
                          Key Benefits
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {scheme.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Application Process */}
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          How to Apply
                        </h4>
                        <p className="text-sm mb-3">{scheme.applicationProcess}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-1">Contact Information:</p>
                            <p>{scheme.contactInfo.department}</p>
                            <p>Phone: {scheme.contactInfo.phone}</p>
                            <p>Email: {scheme.contactInfo.email}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button asChild className="shadow-button">
                              <a href={scheme.contactInfo.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Official Website
                              </a>
                            </Button>
                            <Button variant="outline">
                              <FileText className="mr-2 h-4 w-4" />
                              Download Application Form
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSchemes.length === 0 && (
                <Card className="shadow-card">
                  <CardContent className="p-12 text-center">
                    <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Schemes Found</h3>
                    <p className="text-muted-foreground mb-6">
                      No schemes match your current filters. Try adjusting your search criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setStateFilter('');
                      setCategoryFilter('');
                    }}>
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;