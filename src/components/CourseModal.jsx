import { useEffect, useState } from 'react';

function CourseModal({ course, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (course) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [course, onClose]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const nextImage = () => {
    if (course.detailImages && course.detailImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === course.detailImages.length - 1 ? 0 : prev + 1
      );
      setImageLoaded(false);
      setImageError(false);
    }
  };

  const prevImage = () => {
    if (course.detailImages && course.detailImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? course.detailImages.length - 1 : prev - 1
      );
      setImageLoaded(false);
      setImageError(false);
    }
  };

  if (!course) {
    return null;
  }
  
  return (
    <div 
      style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 99999
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          maxWidth: '600px', 
          width: '90%', 
          maxHeight: '90vh', 
          overflow: 'auto', 
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>{course.title}</h2>
          <button 
            onClick={onClose} 
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#374151'}
            onMouseOut={(e) => e.target.style.color = '#6b7280'}
          >
            ×
          </button>
        </div>
        
        {/* Image Gallery Container */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '300px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          backgroundColor: '#f3f4f6',
          overflow: 'hidden'
        }}>
          {/* Navigation Buttons */}
          {course.detailImages && course.detailImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          {course.detailImages && course.detailImages.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              zIndex: 10
            }}>
              {currentImageIndex + 1} / {course.detailImages.length}
            </div>
          )}

          {!imageLoaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              zIndex: 5
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          )}
          
          {imageError ? (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb',
              zIndex: 5
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>📚</div>
                <div style={{ fontSize: '14px' }}>No Image Available</div>
              </div>
            </div>
          ) : (
            <img 
              src={course.detailImages ? course.detailImages[currentImageIndex] : course.image} 
              alt={`${course.title} - Image ${currentImageIndex + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                background: '#fff',
                borderRadius: '8px',
                transition: 'opacity 0.3s',
                opacity: imageLoaded ? 1 : 0
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>

        {/* Thumbnail Gallery */}
        {course.detailImages && course.detailImages.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            justifyContent: 'center'
          }}>
            {course.detailImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setImageLoaded(false);
                  setImageError(false);
                }}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid',
                  borderColor: index === currentImageIndex ? '#3b82f6' : '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'none',
                  padding: 0
                }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </div>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            marginBottom: '16px', 
            color: '#374151', 
            lineHeight: '1.6',
            fontSize: '16px'
          }}>
            {course.fullDescription}
          </p>
        </div>
        
        <div style={{ 
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#059669', 
            margin: '0 0 8px 0' 
          }}>
            💰 Price: {course.price.toLocaleString()} VND
          </p>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ color: '#fbbf24' }}>★</span> 
            Rating: {course.rating}/5
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Close
          </button>
          <button
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;