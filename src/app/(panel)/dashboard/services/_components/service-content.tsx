import { getAllServices } from "../_data-access/get-all-services";
import { ServicesLis } from "./service-list";

interface ServicesContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });

  return (
    <div>
      <ServicesLis services={services.data || []} />
    </div>
  );
}
