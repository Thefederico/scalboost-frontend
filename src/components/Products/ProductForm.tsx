"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { createProduct } from "@/services/products";

const formSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  price: z.string({ required_error: "El precio es requerido" }).min(1, {
    message: "El precio debe ser mayor a 0",
  }),
  description: z.string({
    required_error: "La descripción es requerida",
  }),
  category: z.string({ required_error: "La categoría es requerida" }),
  stock: z.string({ required_error: "El stock es requerido" }).min(1, {
    message: "El stock debe ser mayor a 0",
  }),
  imageUrl: z.string({ required_error: "La imagen es requerida" }).url({
    message: "La imagen debe ser una URL válida",
  }),
});

export default function ProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "0",
      description: "",
      category: "",
      stock: "0",
      imageUrl: "",
    },
  });

  const watchImageUrl = form.watch("imageUrl");

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createProduct({ product: values });

      toast("Producto creado correctamente");
    } catch (error) {
      toast("Error al crear el producto");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Precio del producto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cap">Cap</SelectItem>
                  <SelectItem value="Hoodie">Hoodie</SelectItem>
                  <SelectItem value="Joggers">Joggers</SelectItem>
                  <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Stock del producto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-col">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input
                    placeholder="URL  de la imagen del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchImageUrl && (
            <Avatar className="mx-auto my-2">
              <AvatarImage src={watchImageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </section>

        <Button className="mx-auto" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
