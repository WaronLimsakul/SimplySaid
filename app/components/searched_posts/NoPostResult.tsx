import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SearchSlash } from "lucide-react";
import Link from "next/link";

const NoPostResult = () => {
  return (
    <div className="w-full max-w-lg mx-auto mt-16 p-6 rounded-lg shadow-lg text-center">
      <SearchSlash className="mx-auto mb-4" size={50} />
      <Alert className="mb-4">
        <AlertTitle className="text-2xl font-semibold">
          No Posts Found
        </AlertTitle>
        <AlertDescription>
          We couldn&apos;t find any posts that match your search. Please try
          different keywords or filters.
        </AlertDescription>
      </Alert>
      <Button className="text-lg text-secondary px-6 py-3 mt-4" variant="link">
        <Link href="/">Back to main page</Link>
      </Button>
    </div>
  );
};

export default NoPostResult;
