import { notFound } from "next/navigation";
import {
  catalog,
  catalogTypeLabels,
  catalogTypeDescriptions,
  catalogTypes,
  type CatalogType,
} from "@/lib/catalog";
import { getLocalStarterItems } from "@/lib/local-catalog-starters";
import { CatalogPageShell } from "@/components/catalog/catalog-page-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogTypes.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!catalogTypes.includes(type as CatalogType)) return {};
  return {
    title: `${catalogTypeLabels[type as CatalogType]} 카탈로그`,
    description: catalogTypeDescriptions[type as CatalogType],
  };
}

export default async function CatalogTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!catalogTypes.includes(type as CatalogType)) notFound();
  const t = type as CatalogType;
  const title = catalogTypeLabels[t];
  const description = catalogTypeDescriptions[t];

  if (t === "skills") {
    return (
      <CatalogPageShell
        type="skills"
        title={`${title} (${catalog.skills.length})`}
        description={description}
        items={catalog.skills}
        starterItems={getLocalStarterItems("skills")}
        meta={catalog.meta}
      />
    );
  }

  if (t === "agents") {
    return (
      <CatalogPageShell
        type="agents"
        title={`${title} (${catalog.agents.length})`}
        description={description}
        items={catalog.agents}
        starterItems={getLocalStarterItems("agents")}
        meta={catalog.meta}
      />
    );
  }

  if (t === "hooks") {
    return (
      <CatalogPageShell
        type="hooks"
        title={`${title} (${catalog.hooks.length})`}
        description={description}
        items={catalog.hooks}
        starterItems={getLocalStarterItems("hooks")}
        meta={catalog.meta}
      />
    );
  }

  return (
    <CatalogPageShell
      type="rules"
      title={`${title} (${catalog.rules.length})`}
      description={description}
      items={catalog.rules}
      starterItems={getLocalStarterItems("rules")}
      meta={catalog.meta}
    />
  );
}
