import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

const ProductManagement = () => {
  const { toast } = useToast();
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [productForm, setProductForm] = useState({
    photo: "",
    brand: "",
    model: "",
    year: "",
    engineType: "",
    partName: "",
    chassisNumber: "",
    referenceNumber: "",
    quantity: "",
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

  const handleAddCategory = () => {
    if (newCategory) {
      toast({
        title: "Catégorie ajoutée",
        description: `La catégorie "${newCategory}" a été ajoutée avec succès.`,
      });
      setOpenCategoryDialog(false);
      setNewCategory("");
    }
  };

  const generateQRCode = (productData: typeof productForm) => {
    const qrData = JSON.stringify(productData);
    const canvas = document.createElement("canvas");
    QRCodeCanvas({
      value: qrData,
      size: 128,
      level: "H",
    }, canvas);
    return canvas.toDataURL();
  };

  const generatePDF = (productData: typeof productForm) => {
    const doc = new jsPDF({
      format: [50, 30],
      unit: "mm",
    });
    
    const qrCodeDataUrl = generateQRCode(productData);
    doc.addImage(qrCodeDataUrl, "PNG", 5, 2, 20, 20);
    doc.setFontSize(8);
    doc.text(productData.partName, 27, 8);
    doc.text(`${productData.brand} ${productData.model}`, 27, 12);
    doc.text(`Réf: ${productData.referenceNumber}`, 27, 16);
    
    doc.save(`label-${productData.referenceNumber}.pdf`);
  };

  const handleAddProduct = () => {
    if (Object.values(productForm).some((value) => !value)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    generatePDF(productForm);

    toast({
      title: "Produit ajouté",
      description: "Le produit a été ajouté avec succès et l'étiquette a été générée.",
    });
    setOpenProductDialog(false);
    setProductForm({
      photo: "",
      brand: "",
      model: "",
      year: "",
      engineType: "",
      partName: "",
      chassisNumber: "",
      referenceNumber: "",
      quantity: "",
      category: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-semibold">Gestion des Produits</h1>
        <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un Produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations du produit
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  Choisir une photo
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Marque"
                  value={productForm.brand}
                  onChange={(e) =>
                    setProductForm({ ...productForm, brand: e.target.value })
                  }
                />
                <Input
                  placeholder="Modèle"
                  value={productForm.model}
                  onChange={(e) =>
                    setProductForm({ ...productForm, model: e.target.value })
                  }
                />
                <Input
                  placeholder="Année"
                  value={productForm.year}
                  onChange={(e) =>
                    setProductForm({ ...productForm, year: e.target.value })
                  }
                />
                <Input
                  placeholder="Type de moteur"
                  value={productForm.engineType}
                  onChange={(e) =>
                    setProductForm({ ...productForm, engineType: e.target.value })
                  }
                />
                <Input
                  placeholder="Nom de la pièce"
                  value={productForm.partName}
                  onChange={(e) =>
                    setProductForm({ ...productForm, partName: e.target.value })
                  }
                />
                <Input
                  placeholder="Numéro de chassis"
                  value={productForm.chassisNumber}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      chassisNumber: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Numéro de référence"
                  value={productForm.referenceNumber}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      referenceNumber: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Quantité"
                  value={productForm.quantity}
                  onChange={(e) =>
                    setProductForm({ ...productForm, quantity: e.target.value })
                  }
                />
                <Select
                  value={productForm.category}
                  onValueChange={(value) =>
                    setProductForm({ ...productForm, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenProductDialog(false)}
                >
                  Annuler
                </Button>
                <Button onClick={handleAddProduct}>Ajouter</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Catégorie
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une Catégorie</DialogTitle>
                  <DialogDescription>
                    Entrez le nom de la nouvelle catégorie
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Nom de la catégorie"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setOpenCategoryDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button onClick={handleAddCategory}>Ajouter</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Voir historique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Consulter l'historique
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
