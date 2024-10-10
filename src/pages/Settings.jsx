import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Lägg till logik för att ändra temat globalt, t.ex. via Redux eller CSS-variabler
  };

  const handleDeleteInactiveCards = () => {
    dispatch({ type: 'DELETE_INACTIVE_CARDS' });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>Choose Theme: </label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
        </select>
      </div>
      <button onClick={handleDeleteInactiveCards}>Delete All Inactive Cards</button>
    </div>
  );
};

export default Settings;
