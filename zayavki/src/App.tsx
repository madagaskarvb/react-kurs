import { Route, Routes } from 'react-router'
import Header from './components/Header'
import BoardPage from './pages/BoardPage'
import StatsPage from './pages/StatsPage'
import RequestPage from './pages/RequestPage'
import NotFoundPage from './pages/NotFoundPage'
import { useBoard } from './board'

function App() {
  const { requests, loading, error, retry, newCount, notice, handleAdd, handleNext, handleRemove } = useBoard()

  return (
    <>
      <Header newCount={newCount} />
      {notice !== '' && <p className="notice notice--page">{notice}</p>}
      <Routes>
        <Route
          path="/"
          element={
            <BoardPage
              requests={requests}
              loading={loading}
              error={error}
              onRetry={retry}
              onAdd={handleAdd}
              onNext={handleNext}
              onRemove={handleRemove}
            />
          }
        />
        <Route path="/stats" element={<StatsPage requests={requests} loading={loading} />} />
        <Route
          path="/requests/:id"
          element={<RequestPage requests={requests} loading={loading} onNext={handleNext} onRemove={handleRemove} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App