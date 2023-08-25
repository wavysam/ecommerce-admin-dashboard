import SizeForm from "@/components/forms/size-form";
import Heading from "@/components/heading";

export default function Page() {
  return (
    <div>
      <Heading title="Create size" subtitle="Add new size." />
      <div className="py-16 max-w-lg">
        <SizeForm />
      </div>
    </div>
  );
}
