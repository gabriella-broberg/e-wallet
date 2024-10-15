import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/themeSlice';
import { deleteAllInactiveCards } from '../redux/cardsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const cards = useSelector((state) => state.cards.cards);

  const inactiveCards = cards.filter(card => !card.isActive);

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  const handleDeleteInactiveCards = () => {
    if (inactiveCards.length > 0) {
      const confirmed = window.confirm(
        "Do you really want to delete all inactive cards? This action can't be undone."
      );
      if (confirmed) {
        dispatch(deleteAllInactiveCards());
        alert("All inactive cards have been deleted.");
      }
    } else {
      alert("There are no inactive cards to delete.");
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div>
        <label>Choose Theme: </label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
        </select>
      </div>

      <button onClick={handleDeleteInactiveCards}>
        Delete All Inactive Cards
      </button>
    </div>
  );
};

export default Settings;
