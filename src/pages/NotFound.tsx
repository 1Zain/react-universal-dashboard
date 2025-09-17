
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
                <AlertCircle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-sm text-muted-foreground">
                Don't worry, it happens to the best of us. Let's get you back on track!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/")} 
                className="flex items-center gap-2"
                size="lg"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="text-primary hover:text-primary/80"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/analytics")}
                  className="text-primary hover:text-primary/80"
                >
                  Analytics
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/users")}
                  className="text-primary hover:text-primary/80"
                >
                  Users
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/settings")}
                  className="text-primary hover:text-primary/80"
                >
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Still can't find what you're looking for?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-primary/80"
              onClick={() => navigate("/")}
            >
              Contact Support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
