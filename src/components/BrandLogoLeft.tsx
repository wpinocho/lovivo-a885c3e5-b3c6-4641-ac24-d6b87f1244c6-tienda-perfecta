export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-2">
      <img 
        src="/logo.jpg" 
        alt="TechStore Logo"
        className="h-10 w-10 object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-2xl font-bold text-foreground">TechStore</span>
    </a>
  )
}