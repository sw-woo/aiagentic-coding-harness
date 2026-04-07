import localStartersRaw from "../../data/catalog/local-starters.json";
import type { Platform, CatalogType } from "@/lib/catalog";

export type LocalStarterItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  description: string;
  content: string;
};

type LocalStarterMap = Record<CatalogType, LocalStarterItem[]>;

const localStarters = localStartersRaw as LocalStarterMap;

export function getLocalStarterItems(type: CatalogType): LocalStarterItem[] {
  return localStarters[type];
}
