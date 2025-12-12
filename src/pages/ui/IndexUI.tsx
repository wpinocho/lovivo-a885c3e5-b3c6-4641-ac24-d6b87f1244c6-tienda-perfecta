import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-primary/5 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Premium Tech
                <span className="block text-primary">At Your Fingertips</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Discover cutting-edge technology and accessories designed for modern life. Quality, innovation, and style in every product.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="text-lg"
                  onClick={() => {
                    document.getElementById('products')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg"
                  onClick={() => {
                    document.getElementById('collections')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  View Collections
                </Button>
              </div>
            </div>
            <div className="relative lg:h-[500px] h-[300px]">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/a885c3e5-b3c6-4641-ac24-d6b87f1244c6/hero-headphones.jpg"
                alt="Premium Tech Products"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our carefully selected product collections
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Collection' 
                  : 'Featured Products'
                }
              </h2>
              <p className="text-muted-foreground">
                {selectedCollectionId 
                  ? 'Explore products from this collection' 
                  : 'Discover our best-selling tech products'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                See All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};