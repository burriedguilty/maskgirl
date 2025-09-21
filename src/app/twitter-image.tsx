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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #ff69b4, #ff1493)',
          }}
        />
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
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #ff69b4, #ff1493)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
