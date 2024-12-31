import { LoadingSpinner } from "../components/feed/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <LoadingSpinner size={80} color="#FF6F00" className="mx-auto my-auto" />
    </div>
  );
}
