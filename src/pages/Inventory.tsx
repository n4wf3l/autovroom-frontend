
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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Placeholder data - will be replaced with actual data from backend
  const products = [
    {
      id: "1",
      brand: "Renault",
      model: "Clio",
      year: "2025",
      partName: "Filtre à air",
      quantity: 5,
    },
    // Add more products as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Inventaire</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Button>Filtrer</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Marque</TableHead>
            <TableHead>Modèle</TableHead>
            <TableHead>Année</TableHead>
            <TableHead>Pièce</TableHead>
            <TableHead>Quantité</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.model}</TableCell>
              <TableCell>{product.year}</TableCell>
              <TableCell>{product.partName}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Inventory;
