
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { ProductData } from "@/utils/pdf";

const EditProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState<Omit<ProductData, "id">>({
    photo: "",
    brand: "",
    model: "",
    year: "",
    engineType: "",
    partName: "",
    chassisNumber: "",
    referenceNumber: "",
    quantity: 0,
    category: "",
  });

  const categories = [
    "Filtration",
    "Freinage",
    "Suspension",
    "Distribution",
    "Électrique",
    "Transmission",
    "Refroidissement",
  ];

  // Simuler le chargement des données du produit
  useEffect(() => {
    // Dans un cas réel, vous feriez un appel API ici
    const mockProduct = {
      photo: "/placeholder.svg",
      brand: "Renault",
      model: "Clio",
      year: "2025",
      engineType: "1.5 dCi",
      partName: "Filtre à air",
      chassisNumber: "VF15SRP0123456789",
      referenceNumber: "8201527253",
      quantity: 5,
      category: "Filtration",
    };

    setProductForm(mockProduct);
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs
    if (Object.values(productForm).some((value) => !value)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    // Simuler la sauvegarde
    toast({
      title: "Succès",
      description: "Le produit a été modifié avec succès",
    });
    navigate("/inventory");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Modifier le produit</h1>
        <Button variant="outline" onClick={() => navigate("/inventory")}>
          Retour
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="photo" className="text-sm font-medium">
              Photo
            </label>
            <Input
              id="photo"
              type="text"
              value={productForm.photo}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, photo: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">
              Marque
            </label>
            <Input
              id="brand"
              type="text"
              value={productForm.brand}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, brand: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="model" className="text-sm font-medium">
              Modèle
            </label>
            <Input
              id="model"
              type="text"
              value={productForm.model}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, model: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium">
              Année
            </label>
            <Input
              id="year"
              type="text"
              value={productForm.year}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, year: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="engineType" className="text-sm font-medium">
              Type de moteur
            </label>
            <Input
              id="engineType"
              type="text"
              value={productForm.engineType}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, engineType: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="partName" className="text-sm font-medium">
              Nom de la pièce
            </label>
            <Input
              id="partName"
              type="text"
              value={productForm.partName}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, partName: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="chassisNumber" className="text-sm font-medium">
              Numéro de chassis
            </label>
            <Input
              id="chassisNumber"
              type="text"
              value={productForm.chassisNumber}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  chassisNumber: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="referenceNumber" className="text-sm font-medium">
              Numéro de référence
            </label>
            <Input
              id="referenceNumber"
              type="text"
              value={productForm.referenceNumber}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  referenceNumber: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantité
            </label>
            <Input
              id="quantity"
              type="number"
              value={productForm.quantity}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  quantity: parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Catégorie
            </label>
            <Select
              value={productForm.category}
              onValueChange={(value) =>
                setProductForm((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/inventory")}
          >
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
