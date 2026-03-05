export {};

declare global {
  type PackageStatus = "Pending" | "In Transit" | "Delivered" | "Customs";
  type ShippingVia = "Air" | "Ocean";

  type TimelineItem = {
    id: string;
    title: string;
    description: string;
    date: string;
    done: boolean;
  };

  type PackageItem = {
    id: string;
    trackingCode: string;
    status: PackageStatus;
    via: ShippingVia;
    dateAdded: string;
    timeline?: TimelineItem[];
  };
}
