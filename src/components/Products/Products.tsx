/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useProductsStore } from "@/store/products";
import Table from "../Table";
import { Product, SortBy } from "@/common/types/products";
import { deleteProduct, getProducts } from "@/services/products";
import { Button } from "../ui/button";
import { debounce } from "@/lib/utils";
import FiltersBox from "../Table/FiltersBox";

export default function Products() {
  const {
    products,
    highlight,
    maxPrice,
    minPrice,
    sorting,
    limit,
    offset,
    hasMoreProducts,
    category,
    setProducts,
    toggleHighlight,
    setMaxPrice,
    setMinPrice,
    setSorting,
    setOffset,
    setHasMoreProducts,
    setCategory,
  } = useProductsStore((store) => store);

  const initialProducts = useRef<Product[]>([]);

  const handleFilterByCategory = (value: string) => {
    if (category != value) {
      setOffset(0);
    }

    setCategory(value);
    getProducts({
      params: {
        category: value,
        limit,
        offset,
        maxPrice,
        minPrice,
      },
    }).then((res) => setProducts(res ?? []));
  };

  const handleFilterByPrice = (max: number | null, min: number | null) => {
    if (min === null || max === null) return;

    if (max < 1 || min < 1) return;
    getProducts({
      params: {
        category,
        limit,
        offset,
        minPrice: min,
        maxPrice: max,
      },
    }).then((res) => setProducts(res ?? []));
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const resetFilters = () => {
    setProducts(initialProducts.current);
    setSorting(SortBy.NONE);
    setOffset(0);
    setHasMoreProducts(true);
    setCategory(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct({ id }).then(() => {
      getProducts({
        params: {
          limit,
          offset,
        },
      }).then((res) => setProducts(res ?? []));
    });
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      getProducts({
        params: {
          limit,
          offset,
          name: value,
        },
      }).then((res) => setProducts(res ?? []));
    }, 500),
    []
  );

  const sortedProducts = useMemo(() => {
    if (sorting === SortBy.NONE) return products;
    if (sorting === SortBy.PRICE_ASCENDING) {
      return products.toSorted((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    }

    const compareProperties: Record<string, (product: Product) => any> = {
      [SortBy.NAME]: (product: Product): string => product.name,
      [SortBy.CATEGORY]: (product: Product): string => product.category,
      [SortBy.STOCK]: (product: Product): number => product.stock,
      [SortBy.DESCRIPTION]: (product: Product): string => product.description,
    };

    return products.toSorted((a: Product, b: Product) => {
      const extactProperty = compareProperties[sorting];
      return extactProperty(a).localeCompare(extactProperty(b));
    });
  }, [products, sorting]);

  useEffect(() => {
    if (offset === 0) {
      getProducts({
        params: {
          limit,
          offset,
        },
      }).then((res) => {
        if (res)

        setProducts(res ?? []);
        initialProducts.current = res ?? [];
      });
    }

    if (offset !== 0) {
      getProducts({
        params: {
          category,
          limit,
          offset,
          maxPrice,
          minPrice,
        },
      }).then((res) => {
        const concatedProducts = sortedProducts.concat(res ?? []).flat();
        setProducts(concatedProducts);
        if (res?.length === 0) {
          setHasMoreProducts(false);
          setCategory(null);
        }
      });
    }
  }, [offset]);

  return (
    <div>
      <header className="my-10 w-full">
        <h1 className="text-4xl text-center">Puerba técnica Scalboost</h1>
      </header>

      <FiltersBox
        debouncedSearch={debouncedSearch}
        handleFilterByCategory={handleFilterByCategory}
        handleFilterByPrice={handleFilterByPrice}
        maxPrice={maxPrice}
        minPrice={minPrice}
        resetFilters={resetFilters}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        toggleHighlight={toggleHighlight}
      />

      <Table
        changeSort={handleChangeSort}
        handleDelete={handleDelete}
        products={sortedProducts ?? []}
        highlighted={highlight}
      />
      <section className="my-8 flex items-center justify-center w-full">
        <Button
          className=""
          type="button"
          onClick={() => {
            setOffset(offset + limit);
          }}
          disabled={!hasMoreProducts}
        >
          Cargar más productos
        </Button>
      </section>
    </div>
  );
}
