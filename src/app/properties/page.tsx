import { properties, accounts } from "@/lib/mock-data";
import { PropertyCard } from "@/components/properties/property-card";
import { AddPropertyDialog } from "@/components/properties/add-property-dialog";
import { AddAccountDialog } from "@/components/properties/add-account-dialog";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AddPropertyDialog />
        <AddAccountDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => {
          const propertyAccounts = accounts.filter(
            (a) => a.propertyId === property.id
          );
          return (
            <PropertyCard
              key={property.id}
              property={property}
              propertyAccounts={propertyAccounts}
            />
          );
        })}
      </div>
    </div>
  );
}
