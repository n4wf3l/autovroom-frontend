import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Filter, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdf";
import type { ProductData } from "@/utils/pdf";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";

const Inventory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedEngine, setSelectedEngine] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [fetchedProducts, setFetchedProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🎯 Récupération des produits depuis l'API Laravel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setFetchedProducts(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: ProductData) => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = async (product: ProductData) => {
    if (
      !window.confirm(
        `Supprimer ${product.partName} ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    try {
      const response = await API.delete(`/products/${product.id}`);

      if (response.status === 200) {
        toast({
          title: "Produit supprimé",
          description: `${product.partName} a été supprimé avec succès.`,
          variant: "destructive",
        });

        // 🔥 Supprimer le produit de la liste locale sans recharger la page
        setFetchedProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      }
    } catch (error) {
      console.error("❌ Erreur suppression produit :", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit. Réessayez.",
        variant: "destructive",
      });
    }
  };

  const uniqueModels = Array.from(new Set(fetchedProducts.map((p) => p.model)));
  const uniqueYears = Array.from(new Set(fetchedProducts.map((p) => p.year)));
  const uniqueEngine = Array.from(
    new Set(fetchedProducts.map((p) => p.engineType))
  );
  const uniqueCategories = Array.from(
    new Set(fetchedProducts.map((p) => p.category))
  );

  const filteredProducts = fetchedProducts.filter((product) => {
    const matchesSearch = Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesModel =
      selectedModel === "all" ? true : product.model === selectedModel;
    const matchesYear =
      selectedYear === "all" ? true : product.year === selectedYear;
    const matchesEngine =
      selectedEngine === "all" ? true : product.engineType === selectedYear;
    const matchesCategory =
      selectedCategory === "all" ? true : product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesModel &&
      matchesYear &&
      matchesEngine &&
      matchesCategory
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Inventaire</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px]"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-auto">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Modèle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les modèles</SelectItem>
                {uniqueModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les années</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Année</TableHead>
              <TableHead>Type moteur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.photo}
                    alt={product.partName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.year}</TableCell>
                <TableCell>{product.engine_type}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Inventory;
