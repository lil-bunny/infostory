AI-Infographic Video Generator
This project is a React-based web application that generates AI-powered infographic videos based on user input. Users can describe the type of chart they want, upload a video, and create visually engaging infographic presentations. The application uses Material-UI for styling and a backend API for chart and video generation.

Table of Contents
Features
Technologies Used
Setup and Installation
Usage
File Structure
API Endpoints
Contributing
License
Features
Dynamic Chart Generation: Generate D3.js charts based on textual descriptions.
Video Upload: Upload custom videos to integrate with the infographic.
AI-Powered Video Presentation: Generate an AI-powered presentation video.
Mobile-Friendly: Responsive design for mobile and desktop.
User-Friendly Interface: Clean UI built with Material-UI components.
Technologies Used
Frontend
React: UI library for building user interfaces.
Material-UI: Component library for React.
React Icons: Icons for UI elements.
Backend
Backend API hosted on Azure (replace with your own API URL if necessary).
Libraries
D3.js: For chart rendering.
html2canvas: For capturing charts in the browser.
RecordRTC: For video processing.
Setup and Installation
Prerequisites
Node.js (>= 14.x)
npm or yarn
A backend API that supports chart and video generation.
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ai-infographic-video-generator.git
cd ai-infographic-video-generator
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the backend API URL:

env
Copy code
REACT_APP_API_BASE_URL=https://your-backend-api-url
Start the development server:

bash
Copy code
npm start
Open the application in your browser:

plaintext
Copy code
http://localhost:3000
Usage
1. Generate a Chart
Enter a description of the chart you want to create.
Click Generate. The chart will be rendered in a preview.
2. Upload a Video
Upload a custom video to integrate with the chart.
Wait for the video to be processed.
3. Generate a Video Presentation
Once the video is uploaded, click Generate Presentation.
View the AI-powered infographic presentation in the mobile preview.
File Structure
bash
Copy code
.
├── src/
│   ├── components/
│   │   └── ChartGeneratorFinal.js  # Main component
│   ├── App.js                      # App entry point
│   ├── index.js                    # React DOM rendering
│   ├── assets/                     # Static assets
│   └── styles/                     # Custom styles
├── public/
│   └── index.html                  # HTML template
├── .env                            # Environment variables
├── package.json                    # Project metadata
├── README.md                       # Documentation
API Endpoints
Chart Generation API
Endpoint: /generate_chart/
Method: POST
Payload:

json
Copy code
{
  "message": "Your chart description"
}
Video Upload API
Endpoint: /upload-video/
Method: POST
Payload: FormData with a file key for video.

Video Generation API
Endpoint: /generate_video/
Method: POST
Payload:

json
Copy code
{
  "text": "Chart description",
  "video_url": "Uploaded video URL"
}
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature-name
Commit changes:
bash
Copy code
git commit -m "Description of changes"
Push the branch:
bash
Copy code
git push origin feature-name
Create a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
Author: Debdut Bhaduri
