import { Card, CardContent } from "@/components/ui/card"

export default function CarCardSkeleton() {
  return (
    <div className="perspective-[1000px] h-[420px]">
      <Card className="h-full overflow-hidden border-border/50 animate-pulse">
        <div className="h-48 bg-muted/30" />
        <CardContent className="p-4 space-y-3">
          <div className="h-5 w-3/4 rounded bg-muted/30" />
          <div className="flex gap-3">
            <div className="h-3 w-20 rounded bg-muted/20" />
            <div className="h-3 w-24 rounded bg-muted/20" />
          </div>
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-full bg-muted/20" />
            <div className="h-5 w-20 rounded-full bg-muted/20" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
