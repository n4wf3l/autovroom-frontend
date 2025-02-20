import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { generatePDF } from "@/utils/pdf";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import API from "@/services/api";

const ProductManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  type ProductForm = {
    id?: string;
    photo: File | string | null;
    brand: string;
    model: string;
    year: string;
    engineType: string;
    partName: string;
    chassisNumber: string;
    referenceNumber: string;
    quantity: string;
    category: string;
    qrCode?: string;
  };

  const [productForm, setProductForm] = useState<ProductForm>({
    id: "",
    photo: null,
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

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductForm[]>([]); // 🔥 Liste dynamique des produits

  // 🔥 Charge les catégories et produits au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          API.get("/categories"),
          API.get("/products"),
        ]);

        setCategories(categoryRes.data.map((c: { name: string }) => c.name));
        setProducts(productRes.data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  // 🎯 Ajouter une nouvelle catégorie dynamiquement
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await API.post("/categories", { name: newCategory });

      if (response.status === 201) {
        toast({
          title: "Catégorie ajoutée",
          description: `La catégorie "${newCategory}" a été ajoutée avec succès.`,
        });

        setCategories((prev) => [...prev, response.data.name]);
        setOpenCategoryDialog(false);
        setNewCategory("");
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la catégorie :", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie. Essayez encore.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProductForm((prev) => ({ ...prev, photo: file }));
  };

  const generateQRCode = async (productData: ProductForm) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(productData));
      console.log("📌 QR Code généré", qrCodeDataUrl);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("❌ Erreur lors de la génération du QR Code :", error);
      return null;
    }
  };

  const generatePDF = async (product: ProductForm) => {
    console.log("📌 generatePDF exécuté", product);

    if (!product.qrCode) {
      console.error("❌ Impossible d'ajouter le QR Code, URL manquante");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [50, 50], // Taille étiquette
    });

    // Ajouter le QR Code
    doc.addImage(product.qrCode, "PNG", 10, 10, 30, 30);

    // Ajouter la référence sous le QR Code
    doc.setFontSize(8);
    doc.text(`Ref: ${product.referenceNumber}`, 10, 45);

    console.log("📌 Sauvegarde du PDF...");
    doc.save(`etiquette-${product.id || "produit"}.pdf`);
  };

  const handleAddProduct = async () => {
    if (loading) return; // ⛔ Empêcher plusieurs clics

    console.log("🚀 Bouton Ajouter cliqué");
    setLoading(true); // 🟢 Activer le chargement

    const formData = new FormData();

    Object.entries(productForm).forEach(([key, value]) => {
      if (key === "quantity") {
        formData.append(key, String(Number(value))); // ✅ Conversion propre
      } else if (key === "engineType") {
        formData.append("engine_type", value);
      } else if (key === "partName") {
        formData.append("part_name", value);
      } else if (key === "chassisNumber") {
        formData.append("chassis_number", value || "");
      } else if (key === "referenceNumber") {
        formData.append("reference_number", value || "");
      } else if (key !== "photo") {
        formData.append(key, value ?? "");
      }
    });

    if (productForm.photo) {
      formData.append("photo", productForm.photo);
    }

    console.log("📌 Données envoyées :", Object.fromEntries(formData));

    try {
      const response = await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Réponse API reçue :", response.data);

      if (response.status === 201) {
        // Génération du QR Code et du PDF
        const qrCodeUrl = await generateQRCode({
          ...productForm,
          id: response.data.id,
        });

        const pdfData: ProductForm = {
          ...productForm,
          id: response.data.id,
          quantity: String(productForm.quantity), // TypeScript attend une string, alors on convertit proprement
          photo: productForm.photo
            ? typeof productForm.photo === "string"
              ? productForm.photo // Si c'est déjà une URL, on la garde
              : URL.createObjectURL(productForm.photo) // Sinon, on génère une URL temporaire
            : "",
          qrCode: qrCodeUrl,
        };

        await generatePDF(pdfData);

        toast({
          title: "Produit ajouté",
          description:
            "Le produit a été ajouté avec succès et l'étiquette a été générée.",
        });

        setOpenProductDialog(false);
        setProductForm({
          photo: null,
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

        navigate("/inventory"); // 🔥 Redirection après ajout
      }
    } catch (error) {
      console.error("❌ Erreur API :", error);
      toast({
        title: "Erreur",
        description:
          "Impossible d'ajouter le produit. Vérifiez votre connexion.",
        variant: "destructive",
      });
    } finally {
      navigate("/inventory");
      setLoading(false); // 🔴 Désactiver le loading à la fin
    }
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
                <label
                  htmlFor="photo"
                  className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  {productForm.photo ? (
                    <img
                      src={
                        typeof productForm.photo === "string"
                          ? productForm.photo // Si c'est déjà une URL, on l'utilise directement
                          : URL.createObjectURL(productForm.photo)
                      } // Sinon, on génère une URL temporaire
                      alt="Aperçu du produit"
                      className="w-32 h-32 rounded-lg"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("photo")?.click()}
                >
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
                  type="number"
                  value={productForm.year}
                  onChange={(e) =>
                    setProductForm({ ...productForm, year: e.target.value })
                  }
                />
                <Input
                  placeholder="Type de moteur"
                  value={productForm.engineType}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      engineType: e.target.value,
                    })
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
                  placeholder="Numéro de châssis"
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
                <Button onClick={handleAddProduct} disabled={loading}>
                  {loading ? "Ajout en cours..." : "Ajouter"}
                </Button>
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
            <Dialog
              open={openCategoryDialog}
              onOpenChange={setOpenCategoryDialog}
            >
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

            {/* 🔥 Liste des Catégories Dynamiques */}
            <div className="mt-4 space-y-2">
              {categories.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Aucune catégorie ajoutée.
                </p>
              ) : (
                categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                  >
                    <span>{category}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Voir historique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4" />
              Consulter l'historique
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
