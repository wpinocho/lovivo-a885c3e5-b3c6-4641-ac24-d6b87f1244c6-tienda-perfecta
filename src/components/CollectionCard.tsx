import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onViewProducts(collection.id)}>
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
              No image
            </div>
          )}
          {collection.featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-foreground font-bold text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View Products →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}