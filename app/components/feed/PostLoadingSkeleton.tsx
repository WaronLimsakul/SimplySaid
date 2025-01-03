import { Skeleton } from "@/components/ui/skeleton";

const PostLoadingSkeleton = () => {
    return (
        <div className="grid grid-cols-12 gap-0 md:gap-4">
            <div className="md:col-span-3 col-span-0" />
            <div className="col-span-12 md:col-span-6 mx-2 md:mx-0">
                {[1, 2, 3].map((val) => (
                    <div key={val} className="my-4">
                        <Skeleton className="h-10 w-auto my-1 rounded-xl" />
                        <div className="flex">
                            <Skeleton className="h-10 w-10 mr-2 my-2 rounded-full" />
                            <Skeleton className="h-5 w-1/2 my-auto rounded-xl" />
                        </div>
                        <div className="flex">
                            <Skeleton className="h-5 w-1/6 rounded-xl mx-2" />
                            <Skeleton className="h-5 w-1/6 rounded-xl mx-2" />
                            <Skeleton className="h-5 w-1/6 rounded-xl mx-2" />
                        </div>
                        <div className="pt-3 pb-2">
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                            <Skeleton className="h-5 w-full my-2 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:col-span-3 col-span-0" />
        </div>
    );
};

export default PostLoadingSkeleton;
