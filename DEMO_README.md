# 🎯 **Demo Files Guide**

This directory contains demo files for testing the ConversationalInput component with Mistral Cloud AI.

## 📁 **Demo Files**

### **1. `demo.html` (Public Version)**
- ✅ **Safe for public repositories**
- ✅ **No API keys exposed**
- ✅ **Users enter their own API keys**
- ✅ **Interactive API key configuration**

### **2. `demo-template.html` (Template Version)**
- ✅ **Template for creating custom demos**
- ✅ **No API keys included**
- ✅ **Can be safely shared and modified**

### **3. `demo-local.html` (Local Testing)**
- ⚠️ **Contains API key - DO NOT COMMIT TO GIT**
- ✅ **Pre-configured for immediate testing**
- ✅ **Perfect for local development**

## 🚀 **How to Test the Demo**

### **Option 1: Public Demo (Recommended)**
```bash
# Open the public demo
open demo.html
```
- Enter your Mistral Cloud API key when prompted
- Test all three demo modes
- Safe to share with others

### **Option 2: Local Testing**
```bash
# Open the local demo (pre-configured)
open demo-local.html
```
- Your API key is already configured
- Immediate testing without setup
- **⚠️ Never commit this file to git**

### **Option 3: Template**
```bash
# Use the template to create your own demo
cp demo-template.html my-demo.html
# Edit my-demo.html and add your API key
open my-demo.html
```

## 🔑 **Getting Your Mistral Cloud API Key**

1. Visit [console.mistral.ai](https://console.mistral.ai/)
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key and use it in the demo

## 🎮 **Demo Features**

### **Three Demo Modes**

1. **Basic AI Processing**
   - Simple text processing
   - Perfect for testing basic functionality

2. **HR Assistant**
   - Professional HR assistant with custom prompts
   - Structured data extraction
   - Returns JSON with candidate analysis

3. **Advanced Analysis**
   - Dynamic prompt generation
   - File-aware analysis
   - Comprehensive candidate evaluation

### **Interactive Features**
- ✅ **Voice Input**: Click microphone to speak
- ✅ **File Upload**: Drag & drop files or click to upload
- ✅ **Sample Inputs**: Pre-written examples to try
- ✅ **Real-time AI Processing**: Live responses from Mistral Cloud
- ✅ **Error Handling**: Clear error messages

## 📊 **Tracking Downloads & Usage**

### **GitHub Analytics**
- **GitHub Insights**: View download statistics in your repository
- **GitHub Traffic**: See clone counts and visitor analytics
- **Releases**: Track downloads of specific versions

### **NPM Analytics**
```bash
# View NPM package statistics
npm view @junniepat/conversational-ai-input
```

### **Custom Analytics (Optional)**
You can add custom tracking to the demo:

```javascript
// Add to demo files for custom analytics
function trackDemoUsage(action, data) {
    // Send to your analytics service
    console.log('Demo usage:', action, data);
}

// Track when users interact with the demo
trackDemoUsage('demo_started', { mode: activeDemo });
trackDemoUsage('ai_request', { provider: 'mistral', model: 'mistral-large-latest' });
```

## 🔒 **Security Best Practices**

### **For Public Repositories**
- ✅ Use `demo.html` (no API keys)
- ✅ Use `demo-template.html` for templates
- ✅ Never commit files with API keys
- ✅ Use environment variables in production

### **For Local Development**
- ✅ Use `demo-local.html` for testing
- ✅ Add `demo-local.html` to `.gitignore`
- ✅ Never push files with API keys
- ✅ Rotate API keys regularly

## 🚀 **Deployment Options**

### **GitHub Pages**
```bash
# Enable GitHub Pages in repository settings
# Push demo.html to main branch
# Access at: https://yourusername.github.io/repository-name/demo.html
```

### **Netlify**
```bash
# Connect your GitHub repository to Netlify
# Deploy automatically on push
# Custom domain support available
```

### **Vercel**
```bash
# Connect your GitHub repository to Vercel
# Automatic deployments
# Edge functions support
```

## 📈 **Monitoring Usage**

### **GitHub Repository Insights**
1. Go to your repository on GitHub
2. Click on "Insights" tab
3. View "Traffic" for visitor statistics
4. Check "Releases" for download counts

### **NPM Package Statistics**
1. Visit [npmjs.com](https://www.npmjs.com)
2. Search for your package
3. View download statistics
4. Check weekly/monthly trends

## 🎯 **Next Steps**

1. **Test the demo** using `demo-local.html`
2. **Share the public demo** using `demo.html`
3. **Monitor usage** through GitHub and NPM analytics
4. **Gather feedback** from users
5. **Iterate and improve** based on usage patterns

---

**Happy testing! 🚀**
