export {};

declare global {
  type PackageStatus = "Pending" | "In Transit" | "Delivered" | "Customs";
  type ShippingVia = "Air" | "Ocean";

  type TimelineItem = {
    id: string;
    title: string;
    description: string;
    date: string;
    status: PackageStatus;
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
