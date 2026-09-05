import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global error listener to display any error directly on screen
window.addEventListener('error', (event) => {
  console.error('Captured window error:', event.error || event.message);
  const root = document.getElementById('root');
  if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
    root.innerHTML = `
      <div style="padding: 30px; background: #0B0F19; color: #fff; min-height: 100vh; font-family: sans-serif;">
        <h2 style="color: #f43f5e; font-size: 20px; font-weight: bold;">⚠️ Fixzy Runtime Error Captured</h2>
        <p style="color: #cbd5e1; margin-top: 8px; font-size: 14px;">An error prevented the app from rendering:</p>
        <pre style="background: #1e293b; color: #f87171; padding: 16px; border-radius: 8px; overflow: auto; margin-top: 12px; font-size: 13px;">${event.error?.stack || event.message}</pre>
        <button onclick="window.location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #38bdf8; color: #000; font-weight: bold; border-radius: 8px; border: none; cursor: pointer;">
          Reload App
        </button>
      </div>
    `;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Captured unhandled rejection:', event.reason);
});

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col items-center justify-center text-center">
          <div className="max-w-xl p-6 rounded-2xl border border-rose-500/40 bg-slate-900 shadow-2xl">
            <h2 className="text-xl font-bold text-rose-400 mb-2">Something went wrong</h2>
            <p className="text-xs text-slate-400 mb-4">Fixzy encountered an unexpected error during render.</p>
            <pre className="text-left bg-slate-950 p-4 rounded-xl text-rose-300 text-xs overflow-auto max-h-60 border border-slate-800">
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs rounded-xl shadow transition-all"
            >
              Reload Fixzy
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
)
