
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const ProductManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Gestion des Produits</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Catégorie
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Visualisez l'historique des entrées et sorties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scanner QR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Scannez un code QR pour gérer un produit
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
