import PreviewClient from "./PreviewClient";

type PreviewPageProps = {
  searchParams?: Promise<{
    file?: string;
    title?: string;
    issuer?: string;
    year?: string;
  }>;
};

export default async function CertificationPreviewPage({ searchParams }: PreviewPageProps) {
  const params = (await searchParams) || {};

  return (
    <PreviewClient
      fileUrl={params.file || ""}
      title={params.title || "Certificazione"}
      issuer={params.issuer || ""}
      year={params.year || ""}
    />
  );
}
