import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleEdit = (product: ProductData) => {
    toast({
      title: "Modification",
      description: `Modification de ${product.partName} en cours de développement.`,
    });
  };

  const handleDelete = (product: ProductData) => {
    toast({
      title: "Suppression",
      description: `Suppression de ${product.partName} en cours de développement.`,
      variant: "destructive",
    });
  };

  const handleGeneratePDF = async (product: ProductData) => {
    try {
      await generatePDF(product);
      toast({
        title: "PDF généré",
        description: "L'étiquette a été générée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };

  const products: ProductData[] = [
    {
      id: "1",
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
    },
    {
      id: "2",
      photo: "/placeholder.svg",
      brand: "Peugeot",
      model: "308",
      year: "2024",
      engineType: "1.2 PureTech",
      partName: "Plaquettes de frein",
      chassisNumber: "VF3LBHFS5LS123456",
      referenceNumber: "1623192280",
      quantity: 8,
      category: "Freinage",
    },
    {
      id: "3",
      photo: "/placeholder.svg",
      brand: "Citroën",
      model: "C4",
      year: "2025",
      engineType: "1.6 HDi",
      partName: "Filtre à huile",
      chassisNumber: "VF7NCBHY6JY123456",
      referenceNumber: "1109CL",
      quantity: 12,
      category: "Filtration",
    },
    {
      id: "4",
      photo: "/placeholder.svg",
      brand: "Renault",
      model: "Megane",
      year: "2024",
      engineType: "1.3 TCe",
      partName: "Amortisseur avant",
      chassisNumber: "VF1RFB00167123456",
      referenceNumber: "543029",
      quantity: 4,
      category: "Suspension",
    },
    {
      id: "5",
      photo: "/placeholder.svg",
      brand: "Peugeot",
      model: "2008",
      year: "2025",
      engineType: "1.5 BlueHDi",
      partName: "Courroie distribution",
      chassisNumber: "VF3BUHYJ5LS123456",
      referenceNumber: "1613838580",
      quantity: 6,
      category: "Distribution",
    },
    {
      id: "6",
      photo: "/placeholder.svg",
      brand: "Citroën",
      model: "C3",
      year: "2024",
      engineType: "1.2 PureTech",
      partName: "Batterie",
      chassisNumber: "VF7SXHMP6LT123456",
      referenceNumber: "1609232980",
      quantity: 3,
      category: "Électrique",
    },
    {
      id: "7",
      photo: "/placeholder.svg",
      brand: "Renault",
      model: "Captur",
      year: "2025",
      engineType: "1.6 E-Tech",
      partName: "Disques de frein",
      chassisNumber: "VF1RJB00167123456",
      referenceNumber: "7711130077",
      quantity: 8,
      category: "Freinage",
    },
    {
      id: "8",
      photo: "/placeholder.svg",
      brand: "Peugeot",
      model: "5008",
      year: "2024",
      engineType: "2.0 BlueHDi",
      partName: "Alternateur",
      chassisNumber: "VF3MRHFS5LS123456",
      referenceNumber: "9807189580",
      quantity: 2,
      category: "Électrique",
    },
    {
      id: "9",
      photo: "/placeholder.svg",
      brand: "Citroën",
      model: "C5",
      year: "2025",
      engineType: "1.5 BlueHDi",
      partName: "Embrayage",
      chassisNumber: "VF7RWRHFS5LS123456",
      referenceNumber: "2052P8",
      quantity: 4,
      category: "Transmission",
    },
    {
      id: "10",
      photo: "/placeholder.svg",
      brand: "Renault",
      model: "Arkana",
      year: "2024",
      engineType: "1.3 TCe",
      partName: "Radiateur",
      chassisNumber: "VF1RJL00167123456",
      referenceNumber: "214100073R",
      quantity: 3,
      category: "Refroidissement",
    },
  ];

  const uniqueModels = Array.from(new Set(products.map((p) => p.model)));
  const uniqueYears = Array.from(new Set(products.map((p) => p.year)));
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesModel = selectedModel === "all" ? true : product.model === selectedModel;
    const matchesYear = selectedYear === "all" ? true : product.year === selectedYear;
    const matchesCategory = selectedCategory === "all" ? true : product.category === selectedCategory;

    return matchesSearch && matchesModel && matchesYear && matchesCategory;
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => {
                setSelectedModel("all");
                setSelectedYear("all");
                setSelectedCategory("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Année</TableHead>
              <TableHead>Pièce</TableHead>
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
                <TableCell>{product.partName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog onOpenChange={() => setSelectedProduct(product)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Voir plus
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={product.photo}
                  alt={product.partName}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.partName}</h3>
                  <p className="text-sm text-gray-600">
                    {product.brand} {product.model} ({product.year})
                  </p>
                  <p className="text-sm text-gray-600">
                    Catégorie: {product.category}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Quantité: {product.quantity}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Dialog onOpenChange={() => setSelectedProduct(product)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          Voir plus
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-[90%] w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails du Produit</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={selectedProduct.photo}
                  alt={selectedProduct.partName}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Marque</p>
                  <p>{selectedProduct.brand}</p>
                </div>
                <div>
                  <p className="font-semibold">Modèle</p>
                  <p>{selectedProduct.model}</p>
                </div>
                <div>
                  <p className="font-semibold">Année</p>
                  <p>{selectedProduct.year}</p>
                </div>
                <div>
                  <p className="font-semibold">Type de moteur</p>
                  <p>{selectedProduct.engineType}</p>
                </div>
                <div>
                  <p className="font-semibold">Nom de la pièce</p>
                  <p>{selectedProduct.partName}</p>
                </div>
                <div>
                  <p className="font-semibold">Numéro de chassis</p>
                  <p>{selectedProduct.chassisNumber}</p>
                </div>
                <div>
                  <p className="font-semibold">Numéro de référence</p>
                  <p>{selectedProduct.referenceNumber}</p>
                </div>
                <div>
                  <p className="font-semibold">Quantité</p>
                  <p>{selectedProduct.quantity}</p>
                </div>
                <div>
                  <p className="font-semibold">Catégorie</p>
                  <p>{selectedProduct.category}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <Button variant="outline" onClick={() => handleEdit(selectedProduct)}>
                  Modifier
                </Button>
                <Button variant="outline" onClick={() => handleDelete(selectedProduct)}>
                  Supprimer
                </Button>
                <Button onClick={() => handleGeneratePDF(selectedProduct)}>
                  Générer étiquette
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
