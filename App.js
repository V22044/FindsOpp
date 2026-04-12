import { BookmarksProvider } from "./src/context/BookmarksContext";
import AppContent from "./src/context/AppContent";

const App = () => (
  <BookmarksProvider>
    <AppContent />
  </BookmarksProvider>
);

export default App;
