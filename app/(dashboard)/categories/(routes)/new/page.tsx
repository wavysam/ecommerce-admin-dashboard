import CategoryForm from "@/components/forms/category-form";
import Heading from "@/components/heading";

export default function Page() {
  return (
    <div>
      <Heading title="Create category" subtitle="Add new category." />
      <div className="py-16 max-w-lg">
        <CategoryForm />
      </div>
    </div>
  );
}
