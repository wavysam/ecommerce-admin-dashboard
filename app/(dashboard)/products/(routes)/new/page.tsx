import ColorForm from "@/components/forms/color-form";
import Heading from "@/components/heading";

export default function Page() {
  return (
    <div>
      <Heading title="Create color" subtitle="Add new color." />
      <div className="py-16 max-w-lg">
        <ColorForm />
      </div>
    </div>
  );
}
