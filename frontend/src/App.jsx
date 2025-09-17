import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true); setError(null); setResp(null);
    try {
      const r = await fetch('/api/health'); // Nginx → FastAPI
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setResp(await r.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{fontFamily:'system-ui', maxWidth:640, margin:'48px auto', padding:'0 16px'}}>
      <h1>Gateway Demo: React → Nginx → FastAPI</h1>
      <p>Nginx on :80, React dev server on :5173, FastAPI on :8000</p>
      <button onClick={checkHealth} disabled={loading} style={{padding:'10px 16px', fontSize:16}}>
        {loading ? 'Checking…' : 'Check Backend Health'}
      </button>
      {resp && <pre style={{background:'#111', color:'#0f0', padding:16, borderRadius:8, marginTop:16}}>
{JSON.stringify(resp, null, 2)}
      </pre>}
      {error && <pre style={{background:'#300', color:'#f66', padding:16, borderRadius:8, marginTop:16}}>
Error: {error}
      </pre>}
    </main>
  );
}
