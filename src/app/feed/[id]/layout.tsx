import type { Metadata } from "next";
import { ReactNode } from "react";
import { mockDares } from "@/lib/mock-data";

interface Props {
  params: Promise<{ id: string }>;
  children: ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dare = mockDares.find((d) => d.id === id);

  if (!dare) {
    return {
      title: "Dare Not Found",
      description: "This dare could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const description = `${dare.description.slice(0, 130).trimEnd()}… Earn $${dare.reward} by completing this dare.`;

  return {
    title: dare.title,
    description,
    openGraph: {
      title: `${dare.title} — $${dare.reward} Dare`,
      description,
      url: `https://dareme.app/feed/${dare.id}`,
      type: "website",
      images: [
        {
          url: `/feed/${dare.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dare.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dare.title} — $${dare.reward} Dare`,
      description,
      images: [`/feed/${dare.id}/opengraph-image`],
    },
  };
}

export default function DareLayout({ children }: Props) {
  return <>{children}</>;
}
