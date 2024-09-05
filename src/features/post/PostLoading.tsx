import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PostLoading() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full rounded-md" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-9 w-32" />
      </CardFooter>
    </Card>
  )
}