import React, { useState } from 'react';
import { 
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Link,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import UploadIcon from '@mui/icons-material/Upload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ChartGeneratorFinal = () => {
  const [message, setMessage] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoProcessing, setIsVideoProcessing] = useState(false);
  const [isGenerateVideoEnabled, setIsGenerateVideoEnabled] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [finalVideo, setFinalVideo] = useState('');

  const generateChart = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://aivideobackend.wittyforest-7ed950b1.centralindia.azurecontainerapps.io/generate_chart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const html = await response.text();
      setHtmlContent(html.replaceAll('//',''));
      setShowUpload(true);
    } catch (error) {
      setError("Failed to generate chart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsVideoProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://aivideobackend.wittyforest-7ed950b1.centralindia.azurecontainerapps.io/upload-video/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Video processing failed');
  
      const responseData = await response.json();
      if (responseData.success) {
        setVideoUrl(responseData.video_url);
        setIsGenerateVideoEnabled(true);
        setIsVideoUploaded(true);
      } else {
        throw new Error(responseData.message || 'Unexpected API response');
      }
    } catch (error) {
      setError('Failed to process video. Please try again.');
    } finally {
      setIsVideoProcessing(false);
    }
  };

  const generateVideo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://aivideobackend.wittyforest-7ed950b1.centralindia.azurecontainerapps.io/generate_video/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          video_url: videoUrl,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to generate video');
  
      const data = await response.json();
      if (data.status === 'done') {
        setFinalVideo(data.video_url);
        setVideoUrl('');
        setHtmlContent('');
      } else {
        throw new Error('Video generation is not complete');
      }
    } catch (error) {
      setError('Failed to generate video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const MobilePhoneFrame = ({ children }) => (
    <Box
      sx={{
        width: '280px',
        height: '560px',
        backgroundColor: '#fff',
        borderRadius: '36px',
        border: '12px solid #1a1a1a',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '24px',
          backgroundColor: '#1a1a1a',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          zIndex: 2
        }
      }}
    >
      {children}
    </Box>
  );

  const replaceScriptsInHead = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const scriptTags = doc.querySelectorAll('head script');
  
    scriptTags.forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        if (src.includes('d3js')) {
          script.setAttribute('src', '/libs/d3.v7.min.js');
        } else if (src.includes('html2canvas')) {
          script.setAttribute('src', '/libs/html2canvas.min.js');
        } else if (src.includes('RecordRTC')) {
          script.setAttribute('src', '/libs/RecordRTC.js');
        }
      }
    });
  
    return doc.documentElement.outerHTML;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '20vh' }}>
             <Box
     component="footer"
     sx={{
       py: 1,
       px: 2,
       mt: 'auto',
       backgroundColor: 'white',
    //    borderTop: '1px solid #e0e0e0',
       textAlign: 'center'
     }}
   >
     <Typography 
       variant="body2" 
       color="text.secondary"
       sx={{ 
         '& a': {
           color: '#6020bf',
           textDecoration: 'none',
           '&:hover': {
             textDecoration: 'underline'
           }
         }
       }}
     >
       Made with ❤️ by{' '}
       <Link
         href="https://www.linkedin.com/in/debdut-bhaduri-32323156/"
         target="_blank"
         rel="noopener noreferrer"
       >
         Debdut Bhaduri
       </Link>{''}
       <span role="img" aria-label="linkedin">👨‍💼</span>
     </Typography>
   </Box>
    <Container 
      maxWidth="xl" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: !showUpload ? 'center' : 'flex-start',
        justifyContent: 'center',
        py: 4,
        backgroundColor: '#fafafa'
      }}
    >
      {!showUpload ? (
        <Paper 
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 800,
            p: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            backgroundColor: 'white'
          }}
        >
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ mb: 4, fontWeight: 500, color: '#1a1a1a' }}
          >
            Generate AI powered Infrographic video 🎥
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the chart you want to generate..."
            variant="outlined"
            error={!!error}
            helperText={error}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover fieldset': {
                  borderColor: '#8040df',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6020bf',
                },
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={generateChart}
            disabled={isLoading || !message.trim()}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <BarChartIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              backgroundColor: '#6020bf',
              '&:hover': {
                backgroundColor: '#4a1099',
              },
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {isLoading ? 'Generating Chart...' : 'Generate ✨'}
          </Button>
        </Paper>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <Paper 
            elevation={0}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              backgroundColor: 'white'
            }}
          >
            <Box
              sx={{
                border: '2px dashed #e0e0e0',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: isVideoUploaded ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: isVideoUploaded ? '#4caf50' : '#6020bf',
                  backgroundColor: isVideoUploaded ? '#f1f8e9' : '#faf5ff',
                },
                mb: 3,
                backgroundColor: isVideoUploaded ? '#f1f8e9' : 'transparent'
              }}
              onClick={() => !isVideoUploaded && document.getElementById('video-upload').click()}
            >
              <input
                type="file"
                id="video-upload"
                onChange={handleFileUpload}
                accept="video/*"
                style={{ display: 'none' }}
              />
              {isVideoUploaded ? (
                <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
              ) : (
                <UploadIcon sx={{ fontSize: 48, color: '#6020bf', mb: 2 }} />
              )}
              <Typography variant="h6" sx={{ color: '#1a1a1a', mb: 1 }}>
                {isVideoUploaded ? 'Video Uploaded Successfully' : 'Upload Video'}
              </Typography>
              {!isVideoUploaded && (
                <Typography variant="body2" color="textSecondary">
                  Upload video of chart to generate AI-powered infographic presentation 👀
                </Typography>
              )}
              {isVideoProcessing && (
                <CircularProgress size={24} sx={{ mt: 2, color: '#6020bf' }} />
              )}
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={generateVideo}
              disabled={!isGenerateVideoEnabled || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: '#6020bf',
                '&:hover': {
                  backgroundColor: '#4a1099',
                },
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Generate Presentation 🔥
            </Button>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2,
                  borderRadius: 2
                }}
              >
                {error}
              </Alert>
            )}
          </Paper>

          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            {(htmlContent || videoUrl) && !finalVideo && (
              <Paper 
                elevation={0}
                sx={{ 
                  width: '100%',
                  height: '600px', // Set a fixed height
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  display: 'flex', // Add flex display
                  flexDirection: 'column' // Stack children vertically
                }}
              >
                {htmlContent && (
                  <Box 
                    ref={node => {
                      if (node) {
                        const container = node as HTMLDivElement;
                        container.innerHTML = '';
                        const iframe = document.createElement('iframe');
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.style.border = 'none'; // Remove iframe border
                        container.appendChild(iframe);
                        const doc = iframe.contentWindow?.document;
                        if (doc) {
                          doc.open();
                          const modifiedHtmlContent = replaceScriptsInHead(htmlContent);
                          doc.write(modifiedHtmlContent);
                          doc.close();
                        }
                      }
                    }}
                    sx={{ 
                      width: '100%',
                      flex: 1, // Take up all available space
                      minHeight: 0, // Allow box to shrink
                      overflow: 'hidden' // Prevent scrolling
                    }}
                  />
                )}
                {videoUrl && (
                  <Box sx={{ 
                    width: '100%',
                    flex: 1, // Take up all available space
                    minHeight: 0 // Allow box to shrink
                  }}>
                    <video 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain'
                      }}
                      controls 
                      src={videoUrl}
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
              </Paper>
            )}

            {finalVideo && (
              <MobilePhoneFrame>
                <video 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                  controls 
                  src={finalVideo}
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </MobilePhoneFrame>
            )}
          </Box>
        </Box>
      )}
      
    </Container>

 </Box>
  );
};

export default ChartGeneratorFinal;