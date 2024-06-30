import { cx } from "class-variance-authority";
import { Products, SortBy } from "@/common/types/products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Props {
  products: Products;
  highlighted: boolean;

  handleDelete: (id: string) => void;
  changeSort: (sort: SortBy) => void;
}

export default function Table({
  products,
  highlighted,
  handleDelete,
  changeSort,
}: Props) {
  return (
    <div>
      <table width="100%" className="table-auto">
        <thead>
          <tr>
            <th className="text-center">Imagen</th>
            <th
              className="cursor-crosshair hover:underline"
              onClick={() => changeSort(SortBy.NAME)}
            >
              Nombre
            </th>
            <th
              className="cursor-crosshair hover:underline"
              onClick={() => changeSort(SortBy.PRICE_ASCENDING)}
            >
              Precio
            </th>
            <th
              className="cursor-crosshair hover:underline"
              onClick={() => changeSort(SortBy.STOCK)}
            >
              Stock
            </th>
            <th
              className="cursor-crosshair hover:underline"
              onClick={() => changeSort(SortBy.CATEGORY)}
            >
              Categoría
            </th>
            <th
              className="cursor-crosshair hover:underline"
              onClick={() => changeSort(SortBy.DESCRIPTION)}
            >
              Descripción
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const color = cx({
              "bg-[#333] border-none": index % 2 === 0 && highlighted,
              "bg-[#555] border-none": !(index % 2 === 0) && highlighted,
              "bg-transparent border": !highlighted,
            });
            return (
              <tr key={product._id} className="mx-2 ">
                <td className={`min-w-[140px] ${color}`}>
                  <Avatar className="mx-auto">
                    <AvatarImage src={product.imageUrl} alt={product.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <p className="text-center ">{product.name}</p>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <p className="text-center">{product.price}</p>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <p className="text-center">{product.stock}</p>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <p className="text-center">{product.category}</p>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <p className="text-center">{product.description}</p>
                </td>
                <td className={`min-w-[140px] ${color}`}>
                  <Button
                    className="text-primary w-full border-none"
                    variant="outline"
                    type="button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
