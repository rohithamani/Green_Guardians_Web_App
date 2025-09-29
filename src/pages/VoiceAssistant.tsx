import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  MessageSquare,
  Bot,
  User,
  Loader2,
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your agricultural AI assistant. Ask me anything about farming, crops, diseases, or weather in Tamil Nadu and Kerala.',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = language === 'ta' ? 'ta-IN' : language === 'ml' ? 'ml-IN' : 'en-IN';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTextInput(transcript);
        handleSendMessage(transcript);
      };

      recognition.current.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Unable to recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
      if (synthesis.current) {
        synthesis.current.cancel();
      }
    };
  }, [language]);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    } else {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please type your question instead.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (synthesis.current) {
      synthesis.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'ml' ? 'ml-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('paddy') || lowerMessage.includes('rice')) {
      return 'For paddy cultivation in Tamil Nadu and Kerala, the best planting season is June-July during monsoon. Ensure proper drainage, use certified seeds, and maintain water level at 2-3 cm during vegetative stage. Apply organic fertilizers and watch out for brown plant hopper and blast disease.';
    }
    
    if (lowerMessage.includes('coconut')) {
      return 'Coconut thrives in Kerala\'s coastal climate. Plant during pre-monsoon (April-May). Ensure proper spacing of 7.5-8m between palms. Apply organic manure twice a year and watch for coconut mite and rhinoceros beetle. Harvest mature nuts every 45 days.';
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
      return 'Current weather shows high humidity with monsoon expected next week. Farmers should prepare drainage systems and postpone pesticide application. This is ideal time for transplanting rice and planting coconut saplings.';
    }
    
    if (lowerMessage.includes('disease') || lowerMessage.includes('pest')) {
      return 'Common diseases in this region include blast in rice and quick wilt in pepper. Use integrated pest management - combine neem oil application with proper field sanitation. Avoid chemical pesticides during flowering to protect pollinators.';
    }
    
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrition')) {
      return 'For sustainable farming, use organic fertilizers like compost and vermicompost. Apply NPK in the ratio 4:2:1 for most crops. Soil testing every 6 months will help determine exact nutrient requirements. Green manure from legumes improves soil health.';
    }

    return 'Thank you for your question. As your agricultural AI assistant, I can help with crop selection, disease management, weather planning, and sustainable farming practices. Could you please be more specific about what farming aspect you\'d like guidance on?';
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || textInput.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setTextInput('');
    setIsProcessing(true);

    try {
      const response = await generateAIResponse(text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response if speech synthesis is available
      if (synthesis.current) {
        setTimeout(() => speakText(response), 500);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Mic className="h-8 w-8 text-primary" />
              {t('voiceAssistant')}
            </h1>
            <p className="text-muted-foreground">
              Ask questions about farming using voice or text in your preferred language
            </p>
          </div>

          {/* Voice Controls */}
          <Card className="shadow-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''} shadow-button`}
                  size="lg"
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-5 w-5" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Start Voice Input
                    </>
                  )}
                </Button>

                <Button
                  onClick={isSpeaking ? stopSpeaking : () => {}}
                  variant="outline"
                  disabled={!isSpeaking}
                  size="lg"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="mr-2 h-5 w-5" />
                      Stop Speaking
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-5 w-5" />
                      Voice Output
                    </>
                  )}
                </Button>
              </div>
              {isListening && (
                <div className="text-center mt-4">
                  <div className="inline-flex items-center gap-2 text-primary">
                    <div className="animate-pulse">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    Listening... Speak now
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.isUser ? (
                          <User className="h-5 w-5 mt-0.5" />
                        ) : (
                          <Bot className="h-5 w-5 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-3 justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your farming question or use voice input above..."
                    className="flex-1 min-h-[80px]"
                  />
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={!textInput.trim() || isProcessing}
                    className="shadow-button"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Best crops for monsoon season?',
                  'How to manage rice blast disease?',
                  'Coconut fertilization schedule?',
                  'Weather forecast for next week?',
                  'Organic pest control methods?',
                  'Government schemes for farmers?'
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;