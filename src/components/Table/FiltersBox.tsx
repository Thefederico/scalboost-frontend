import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import ProductForm from "../Products/ProductForm";

interface Props {
  maxPrice: number | null;
  minPrice: number | null;
  toggleHighlight: () => void;
  handleFilterByCategory: (category: string) => void;
  debouncedSearch: (value: string) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  handleFilterByPrice: (
    minPrice: number | null,
    maxPrice: number | null
  ) => void;
  resetFilters: () => void;
}

export default function FiltersBox({
  toggleHighlight,
  handleFilterByCategory,
  debouncedSearch,
  setMinPrice,
  setMaxPrice,
  handleFilterByPrice,
  resetFilters,
  maxPrice,
  minPrice,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen((prev) => !prev);

  return (
    <section className="flex justify-center space-x-4 my-10">
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Prodcuto</DialogTitle>
          </DialogHeader>
          <div>
            <ProductForm />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={toggleDialog}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button type="button" onClick={toggleDialog}>
        Agregar
      </Button>

      <Button type="button" onClick={toggleHighlight}>
        Resaltar
      </Button>
      <Input
        name="search"
        type="text"
        placeholder="Buscar por nombre"
        className="max-w-[180px]"
        onChange={(e) => {
          debouncedSearch(e.target.value);
        }}
      />
      <Select onValueChange={handleFilterByCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Cap">Cap</SelectItem>
          <SelectItem value="Hoodie">Hoodie</SelectItem>
          <SelectItem value="Joggers">Joggers</SelectItem>
          <SelectItem value="T-Shirt">T-Shirt</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="minPrice"
        type="number"
        className="max-w-[100px]"
        placeholder="Mínimo"
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <Input
        name="maxPrice"
        type="number"
        placeholder="Máximo"
        className="max-w-[100px]"
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <Button
        type="button"
        onClick={() => handleFilterByPrice(maxPrice, minPrice)}
      >
        Filtrar por precio
      </Button>

      <Button type="button" onClick={resetFilters}>
        Resetear filtros
      </Button>
    </section>
  );
}
