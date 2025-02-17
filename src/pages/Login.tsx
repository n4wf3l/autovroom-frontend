
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length > 0) { // Allow any non-empty code
      localStorage.setItem("auth", code);
      localStorage.setItem("dbFilter", "all"); // Show all data
      setIsAuthenticated(true);
      navigate("/inventory");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace de gestion d'inventaire",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez entrer un code d'accès",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Gestion d'Inventaire</CardTitle>
          <CardDescription>Entrez votre code d'accès pour continuer</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Code d'accès"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Se Connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
