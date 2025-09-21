# Next.js 13+ OpenGraph Image Generation

Next.js 13+ provides a powerful way to generate OpenGraph images dynamically. Here's how to implement it:

## Option 1: Static Image Files

Place these files in the app directory:
- `opengraph-image.(jpg|jpeg|png|gif)` - For OpenGraph image
- `twitter-image.(jpg|jpeg|png|gif)` - For Twitter image
- `opengraph-image.alt.txt` - Alt text for OpenGraph image (already created)
- `twitter-image.alt.txt` - Alt text for Twitter image (already created)

## Option 2: Dynamic Generation with JavaScript/TypeScript

Create these files in the app directory:

1. For OpenGraph image:
```typescript
// opengraph-image.tsx
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mask Girl - Fan Website'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img 
          src="https://yourdomain.com/logo.png" 
          alt="Mask Girl Logo"
          style={{ width: '300px', height: 'auto', marginBottom: '40px' }}
        />
        <div style={{ 
          fontSize: '64px', 
          fontWeight: 'bold',
          color: '#ff69b4',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          Mask Girl
        </div>
        <div style={{ 
          fontSize: '32px', 
          color: '#333',
          marginTop: '20px',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          Explore the world of Mask Girl
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

2. For Twitter image (can be the same as OpenGraph):
```typescript
// twitter-image.tsx
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mask Girl - Fan Website'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  // Same implementation as opengraph-image.tsx
  // You can copy the same code or customize it for Twitter
}
```

## Implementation Steps

1. Choose either Option 1 or Option 2
2. If using Option 1, create the image files and place them in the app directory
3. If using Option 2, create the TypeScript files as shown above
4. Test your implementation by checking the meta tags in your HTML or using a social media debugger tool

## Notes

- The dynamic generation (Option 2) requires the `@vercel/og` package to be installed
- The static image approach (Option 1) is simpler but less flexible
- You can use different images for OpenGraph and Twitter if needed
