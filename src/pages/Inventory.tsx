
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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
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

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-semibold">Inventaire</h1>
        <div className="flex w-full md:w-auto gap-4">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px]"
          />
          <Button>Filtrer</Button>
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
                <div>
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
