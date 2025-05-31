# Interactive 3D Widget

A modern, responsive React component featuring an interactive 3D metallic cube built with Three.js. This project demonstrates advanced 3D graphics, smooth animations, and intuitive user interactions in a web environment.

## ✨ Features

### Core Functionality
- **🎲 3D Metallic Cube**: Realistic metallic material with environment reflections
- **🔄 Continuous Rotation**: Smooth Y-axis rotation with adjustable speed
- **🖱️ Mouse Interaction**: Subtle tilting based on mouse movement
- **📱 Responsive Design**: Adapts to different screen sizes and containers
- **💡 Advanced Lighting**: Ambient, directional, and point lighting with shadows
- **🎛️ Interactive Controls**: Real-time speed adjustment via slider and preset buttons

### Enhanced Experience
- **⚡ Loading Animation**: Professional spinner during Three.js initialization
- **🛡️ WebGL Fallback**: Graceful degradation when WebGL isn't supported
- **🎨 Modern UI**: Clean, contemporary design with Tailwind CSS
- **🔧 Performance Optimized**: Efficient rendering and proper resource cleanup
- **📊 Real-time Feedback**: Live rotation speed percentage display

## 🚀 Demo

The widget features:
- A metallic cube that rotates continuously
- Mouse interaction for subtle 3D tilting effects
- Dynamic lighting with realistic shadows
- Adjustable rotation speed controls
- Professional loading states and error handling

## 🛠️ Technologies Used

- **React 18+** - Component-based UI framework
- **Three.js r128** - 3D graphics library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   https://github.com/HB936/Interactive3dCube.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
interactive-3d-widget/
├── src/
│   ├── Interactive3DWidget.jsx        # Main 3D widget component
│   ├── App.jsx                        # Root application component
│   ├── main.jsx                       # Application entry point
│   └── index.css                      # Global styles with Tailwind
├── public/                            # Static assets
├── package.json                       # Dependencies and scripts
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind CSS configuration
└── README.md                          # Project documentation
```

### Features Breakdown

#### 3D Scene Setup
- **Camera**: Perspective camera with 75° FOV
- **Renderer**: WebGL renderer with antialiasing and shadows
- **Lighting**: Multi-light setup for realistic illumination

#### Material Properties
- **Metalness**: 0.8 for realistic metal appearance
- **Roughness**: 0.2 for subtle surface imperfections
- **Environment Mapping**: Procedural reflections for enhanced realism

#### Interactive Controls
- **Speed Slider**: Fine-grained control (0-5% speed range)
- **Preset Buttons**: Quick settings (Stop, Normal, Fast)
- **Real-time Updates**: Immediate visual feedback

## 🔍 Browser Compatibility

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

**WebGL Support Required** - Component includes automatic fallback for unsupported browsers.

## 📱 Responsive Behavior

- **Desktop**: Full feature set with smooth interactions
- **Tablet**: Optimized touch interactions
- **Mobile**: Simplified controls for smaller screens
- **Container**: Adapts to parent container dimensions

## ⚡ Performance Optimizations

- **Frame Rate Limiting**: Capped at display refresh rate
- **Resource Cleanup**: Proper disposal of Three.js objects
- **Event Debouncing**: Optimized mouse movement handling
- **Memory Management**: Efficient geometry and texture handling

## 🐛 Troubleshooting

### Common Issues

**1. Black screen or no 3D content**
- Check browser WebGL support
- Verify Three.js import is working
- Check browser console for errors

**2. Performance issues**
- Reduce shadow map resolution
- Lower anti-aliasing settings
- Check device GPU capabilities

**3. Controls not responding**
- Ensure event listeners are properly attached
- Check React state updates
- Verify ref assignments

## 🔧 Configuration Options

### Adjustable Parameters
```javascript
// Rotation speed range
const SPEED_MIN = 0;
const SPEED_MAX = 0.05;
const SPEED_DEFAULT = 0.01;

// Mouse interaction sensitivity
const MOUSE_SENSITIVITY = 0.2;
const LERP_FACTOR = 0.05;

// Material properties
const METALNESS = 0.8;
const ROUGHNESS = 0.2;
const ENV_MAP_INTENSITY = 1.0;
```

## 🎨 Customization

### Changing Cube Color
```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x4f46e5, // Change this hex value
  metalness: 0.8,
  roughness: 0.2
});
```

### Adjusting Lighting
```javascript
// Ambient light intensity
const ambientLight = new THREE.AmbientLight(0x404040, 1.2);

// Directional light intensity
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
```

### Modifying Animation Speed
```javascript
// Default rotation speeds for preset buttons
const SPEEDS = {
  STOP: 0,
  NORMAL: 0.01,
  FAST: 0.03
};
```

### Debug Mode
Add to component for debugging:
```javascript
// Add stats for performance monitoring
import Stats from 'three/examples/jsm/libs/stats.module.js';
const stats = Stats();
document.body.appendChild(stats.dom);
```

### Development Guidelines
- Follow React best practices
- Maintain consistent code formatting
- Add comments for complex Three.js operations
- Test across different browsers and devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For excellent 3D graphics library
- **React Team** - For the robust component framework
- **Tailwind CSS** - For utility-first styling approach
- **Vite Team** - For fast development tooling
2. Create a new issue with detailed description
3. Include browser version and error messages
4. Provide steps to reproduce the problem

---

**Built with ❤️ using React, Three.js, and modern web technologies**
