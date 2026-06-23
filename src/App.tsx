import { useEffect, useState } from 'react';
import { color, layout } from './theme/tokens';
import Header from './components/Header';
import Overview from './chapters/Overview';
import Chapter1 from './chapters/Chapter1';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';
import Chapter6 from './chapters/Chapter6';
import Chapter7 from './chapters/Chapter7';

const CHAPTERS = [Overview, Chapter1, Chapter2, Chapter3, Chapter4, Chapter5, Chapter6, Chapter7];

function readHash(): number {
  const m = window.location.hash.match(/^#\/?(\d)$/);
  const n = m ? Number(m[1]) : 0;
  return n >= 0 && n <= 7 ? n : 0;
}

export default function App() {
  const [chapter, setChapter] = useState<number>(() => (typeof window !== 'undefined' ? readHash() : 0));

  useEffect(() => {
    const onHash = () => setChapter(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (n: number) => {
    setChapter(n);
    if (typeof window !== 'undefined') {
      window.location.hash = `/${n}`;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const Active = CHAPTERS[chapter];

  return (
    <div style={{ minHeight: '100vh', background: color.bg, color: color.ink }}>
      <Header chapter={chapter} onNavigate={navigate} />
      <main style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '52px 40px 88px' }}>
        <Active onNavigate={navigate} />
      </main>
      <footer style={{ borderTop: `1px solid ${color.rule}`, padding: '24px 40px', maxWidth: layout.maxWidth, margin: '0 auto' }}>
        <div style={{ fontSize: 11, color: color.gray3, lineHeight: 1.6 }}>
          An interactive visual companion to <em>How the World Really Works</em> by Vaclav Smil (Viking, 2022). Figures are
          drawn from the book; charts are illustrative. Built as a data-visualization study.
        </div>
      </footer>
    </div>
  );
}
