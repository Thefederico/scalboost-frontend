/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useProductsStore } from "@/store/products";
import Table from "../Table";
import { Product, SortBy } from "@/common/types/products";
import { deleteProduct, getProducts } from "@/services/products";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DebounceFunction {
  (...args: any[]): void;
}

const debounce = <T extends DebounceFunction>(func: T, wait: number): T => {
  let timerId: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  }) as T;
};

export default function Products() {
  const {
    products,
    highlight,
    maxPrice,
    minPrice,
    sorting,
    setProducts,
    toggleHighlight,
    setMaxPrice,
    setMinPrice,
    setSorting,
  } = useProductsStore((store) => store);

  const handleSortByCategory = (category: string) => {
    getProducts({
      params: {
        category,
      },
    }).then((res) => setProducts(res ?? []));
  };

  const handleSortByPrice = (max: number, min: number) => {
    if (max < 1 || min < 1) return;
    getProducts({
      params: {
        minPrice: min,
        maxPrice: max,
      },
    }).then((res) => setProducts(res ?? []));
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const resetFilters = () => {
    setMaxPrice(0);
    setMinPrice(0);
    setSorting(SortBy.NONE);
    getProducts({}).then((res) => setProducts(res ?? []));
  };

  const handleDelete = (id: string) => {
    deleteProduct({ id }).then(() => {
      getProducts({}).then((res) => setProducts(res ?? []));
    });
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      getProducts({
        params: {
          name: value,
        },
      }).then((res) => setProducts(res ?? []));
    }, 500),
    []
  );

  const sortedProducts = useMemo(() => {
    if (sorting === SortBy.NONE) return products;
    if (sorting === SortBy.PRICE_ASCENDING) {
      return products.toSorted((a, b) => b.price - a.price);
    }

    const compareProperties: Record<string, (product: Product) => any> = {
      [SortBy.NAME]: (product: Product): string => product.name,
      [SortBy.CATEGORY]: (product: Product): string => product.category,
      [SortBy.STOCK]: (product: Product): number => product.stock,
      [SortBy.DESCRIPTION]: (product: Product): string => product.description,
    };

    return products.toSorted((a, b) => {
      const extactProperty = compareProperties[sorting];
      return extactProperty(a).localeCompare(extactProperty(b));
    });
  }, [products, sorting]);

  useEffect(() => {
    getProducts({}).then((res) => setProducts(res ?? []));
  }, []);

  return (
    <div>
      <header className="my-10 w-full">
        <h1 className="text-4xl text-center">Puerba técnica Scalboost</h1>
      </header>
      <section className="flex justify-center space-x-4 my-10">
        <Button type="button" onClick={toggleHighlight}>
          Resaltar
        </Button>
        <Select onValueChange={handleSortByCategory}>
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
          value={minPrice}
          placeholder="Precio Mínimo"
          className="max-w-[180px]"
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <Input
          name="maxPrice"
          type="number"
          value={maxPrice}
          placeholder="Precio Máximo"
          className="max-w-[180px]"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <Button
          type="button"
          onClick={() => handleSortByPrice(maxPrice, minPrice)}
        >
          Filtrar por precio
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

        <Button type="button" onClick={resetFilters}>
          Resetear filtros
        </Button>
      </section>
      <Table
        changeSort={handleChangeSort}
        handleDelete={handleDelete}
        products={sortedProducts ?? []}
        highlighted={highlight}
      />
    </div>
  );
}
