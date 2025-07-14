import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Target, BarChart3, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    review: ""
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock model metrics (in real app, these would come from your trained model)
  const modelMetrics = {
    accuracy: 0.84,
    f1Score: 0.82,
    totalSamples: 1000,
    correctPredictions: 840
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    if (!formData.age || !formData.gender || !formData.education || !formData.review) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to make a prediction.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate ML prediction (in real app, this would call your trained model)
    setTimeout(() => {
      // Mock prediction logic based on form data
      const ageScore = parseInt(formData.age) > 30 ? 0.3 : 0.1;
      const genderScore = formData.gender === "Female" ? 0.2 : 0.15;
      const educationScore = formData.education === "Graduate" ? 0.3 : formData.education === "Bachelor" ? 0.2 : 0.1;
      const reviewScore = parseInt(formData.review) >= 4 ? 0.4 : parseInt(formData.review) >= 3 ? 0.2 : 0.1;
      
      const totalScore = ageScore + genderScore + educationScore + reviewScore;
      const willPurchase = totalScore > 0.5 ? 1 : 0;
      
      setPrediction(willPurchase);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete!",
        description: `Customer is ${willPurchase ? "likely" : "unlikely"} to make a purchase.`,
      });
    }, 1500);
  };

  const resetForm = () => {
    setFormData({ age: "", gender: "", education: "", review: "" });
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="h-12 w-12 text-primary animate-float" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Purchase Predictor
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced machine learning model to predict customer purchase behavior based on demographics and reviews
        </p>
      </header>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Model Metrics */}
          <div className="lg:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Model Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Accuracy</span>
                  <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                    {(modelMetrics.accuracy * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">F1 Score</span>
                  <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
                    {modelMetrics.f1Score.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Training Samples</span>
                  <span className="font-semibold">{modelMetrics.totalSamples.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Correct Predictions</span>
                  <span className="font-semibold text-primary">{modelMetrics.correctPredictions}</span>
                </div>
              </CardContent>
            </Card>

            {/* Algorithm Details */}
            <Card className="mt-6 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-accent" />
                  <span>Algorithm Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model Type</span>
                    <span className="font-medium">Logistic Regression</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Features</span>
                    <span className="font-medium">4 (Age, Gender, Education, Review)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preprocessing</span>
                    <span className="font-medium">Label Encoding</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scaling</span>
                    <span className="font-medium">StandardScaler</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Customer Purchase Prediction</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Age Input */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Customer Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter age (18-80)"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      min="18"
                      max="80"
                    />
                  </div>

                  {/* Gender Select */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Education Select */}
                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="Graduate">Graduate Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Review Score */}
                  <div className="space-y-2">
                    <Label htmlFor="review">Review Score (1-5)</Label>
                    <Select value={formData.review} onValueChange={(value) => handleInputChange('review', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select review score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Very Poor</SelectItem>
                        <SelectItem value="2">2 - Poor</SelectItem>
                        <SelectItem value="3">3 - Average</SelectItem>
                        <SelectItem value="4">4 - Good</SelectItem>
                        <SelectItem value="5">5 - Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    onClick={handlePredict} 
                    disabled={isLoading}
                    variant="hero" 
                    size="lg" 
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Activity className="mr-2 h-4 w-4 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Predict Purchase
                      </>
                    )}
                  </Button>
                  <Button onClick={resetForm} variant="outline" size="lg">
                    Reset Form
                  </Button>
                </div>

                {/* Prediction Result */}
                {prediction !== null && (
                  <Card className="mt-6 animate-scale-in">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
                        prediction === 1 
                          ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {prediction === 1 ? (
                          <>
                            <TrendingUp className="h-5 w-5" />
                            <span>Will Purchase</span>
                          </>
                        ) : (
                          <>
                            <Users className="h-5 w-5" />
                            <span>Won't Purchase</span>
                          </>
                        )}
                      </div>
                      <p className="mt-4 text-muted-foreground">
                        Based on the provided customer data, our model predicts this customer is{' '}
                        <span className="font-semibold text-foreground">
                          {prediction === 1 ? 'likely' : 'unlikely'}
                        </span>{' '}
                        to make a purchase.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;