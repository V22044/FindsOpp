import { BookmarksProvider } from "./src/context/BookmarksContext";
import AppContent from "./src/context/AppContent";
import { ApplicationsProvider } from "./src/context/ApplicationsContext";

const App = () => (
  <BookmarksProvider>
    <ApplicationsProvider>
      <AppContent />
    </ApplicationsProvider>
  </BookmarksProvider>
);

export default App;
