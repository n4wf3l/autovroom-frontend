
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface HistoryEntry {
  id: string;
  date: string;
  type: "in" | "out";
  quantity: number;
  product: string;
  reference: string;
  operator: string;
}

const History = () => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - à remplacer par des vraies données
  const historyData: HistoryEntry[] = [
    {
      id: "1",
      date: "2024-02-19 14:30",
      type: "in",
      quantity: 5,
      product: "Filtre à air",
      reference: "8201527253",
      operator: "John Doe",
    },
    {
      id: "2",
      date: "2024-02-19 15:45",
      type: "out",
      quantity: 2,
      product: "Filtre à air",
      reference: "8201527253",
      operator: "Jane Smith",
    },
  ];

  const filteredHistory = historyData.filter((entry) => {
    const matchesType = filterType === "all" ? true : entry.type === filterType;
    const matchesSearch = Object.values(entry).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Historique des mouvements</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-[300px]"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Type de mouvement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les mouvements</SelectItem>
            <SelectItem value="in">Entrées</SelectItem>
            <SelectItem value="out">Sorties</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Opérateur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {entry.type === "in" ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    {entry.type === "in" ? "Entrée" : "Sortie"}
                  </div>
                </TableCell>
                <TableCell>{entry.quantity}</TableCell>
                <TableCell>{entry.product}</TableCell>
                <TableCell>{entry.reference}</TableCell>
                <TableCell>{entry.operator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default History;
