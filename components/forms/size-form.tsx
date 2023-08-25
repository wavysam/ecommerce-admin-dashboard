"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader, Loader2 } from "lucide-react";

interface Props {
  initialData?: Size | null;
}

const schema = z.object({
  name: z.string().nonempty(),
  value: z.string().nonempty(),
});

export default function SizeForm({ initialData }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (initialData) {
      const res = await fetch(`/api/size/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/sizes");
        router.refresh();
        toast({
          title: "Success!",
          description: "Size updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to update size.",
        });
      }
    } else {
      const res = await fetch("/api/size", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/sizes");
        router.refresh();
        toast({
          title: "Success!",
          description: "Size created.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Failed to create size.",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <Label>Name</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="value"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <Label>Value</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
