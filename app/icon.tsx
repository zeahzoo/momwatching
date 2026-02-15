import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        {/* 눈 외곽 (타원) */}
        <div
          style={{
            width: '22px',
            height: '14px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 눈동자 */}
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#1E40AF',
              borderRadius: '50%',
              position: 'relative',
            }}
          >
            {/* 하이라이트 */}
            <div
              style={{
                width: '3px',
                height: '3px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '1px',
                left: '2px',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
