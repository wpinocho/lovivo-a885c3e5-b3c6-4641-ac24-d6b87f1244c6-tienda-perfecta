import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={`py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {!loadingCollections && hasCollections && (
                <ScrollLink 
                  to="/#collections" 
                  className="text-foreground/70 hover:text-primary font-medium transition-colors relative group"
                >
                  Collections
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </ScrollLink>
              )}
              <ScrollLink 
                to="/#products" 
                className="text-foreground/70 hover:text-primary font-medium transition-colors relative group"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </ScrollLink>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-primary font-medium transition-colors relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-gradient-to-br from-foreground via-foreground to-primary/10 text-background py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="filter brightness-0 invert">
              <BrandLogoLeft />
            </div>
            <p className="mt-4 text-background/70 text-sm">
              Premium technology and accessories designed for modern life. Quality, innovation, and style in every product.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-background text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block text-background/70 hover:text-background transition-colors text-sm"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-background text-lg">Connect With Us</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-background/60 text-sm">
          <p>&copy; 2025 TechStore. All rights reserved.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}