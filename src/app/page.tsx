import SurahLists from "@/components/SurahLists";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q;

  return (
    <div className="container mx-auto px-3">
      <SurahLists query={query} />
    </div>
  );
}
