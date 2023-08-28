"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "../image-upload";

interface Props {
  initialData?: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const schema = z.object({
  name: z.string().nonempty(),
  price: z.coerce.number().nonnegative(),
  categoryId: z.string().nonempty(),
  colorId: z.string().nonempty(),
  sizeId: z.string().nonempty(),
  isFeatured: z.boolean().default(false),
  images: z.object({ url: z.string() }).array(),
});

export default function ProductForm({
  initialData,
  categories,
  sizes,
  colors,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      categoryId: initialData?.categoryId || "",
      sizeId: initialData?.sizeId || "",
      colorId: initialData?.colorId || "",
      isFeatured: initialData?.isFeatured || false,
      images: initialData?.images || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (initialData) {
      const res = await fetch(`/api/product/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/products");
        router.refresh();
        toast({
          title: "Success!",
          description: "Product updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to update size.",
        });
      }
    } else {
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/products");
        router.refresh();
        toast({
          title: "Success!",
          description: "Product created.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to create product.",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="images"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-8">
              <Label>Product Image</Label>
              <FormControl>
                <ImageUpload
                  value={field.value.map((image) => image.url)}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange(
                      field.value.filter((image) => image.url !== url)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-8 mb-8">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Price</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Category</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <FormControl>
                      <SelectValue placeholder="Select a category" />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sizeId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Size</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <FormControl>
                      <SelectValue placeholder="Select a size" />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="colorId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Color</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <FormControl>
                      <SelectValue placeholder="Select a color" />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="isFeatured"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Set as featured product</FormLabel>
                  <FormDescription>This will show to homepage.</FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {initialData ? (
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-1.5">
                Updating <Loader2 className="h-5 w-5 animate-spin" />
              </span>
            ) : (
              "Update"
            )}
          </Button>
        ) : (
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-1.5">
                Creating <Loader2 className="h-5 w-5 animate-spin" />
              </span>
            ) : (
              "Create"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
