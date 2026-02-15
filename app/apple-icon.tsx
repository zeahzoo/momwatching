import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 배경 원 */}
        <div
          style={{
            width: '140px',
            height: '140px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 눈 외곽 (타원) */}
          <div
            style={{
              width: '100px',
              height: '60px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid rgba(255,255,255,0.5)',
            }}
          >
            {/* 눈동자 */}
            <div
              style={{
                width: '35px',
                height: '35px',
                background: '#1E40AF',
                borderRadius: '50%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 하이라이트 */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '6px',
                  left: '10px',
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
