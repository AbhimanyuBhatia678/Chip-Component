import React, { useState, useEffect, useRef } from 'react';
import styles from './ChipsComponent.module.css';

interface ChipItem {
  name: string;
  email: string;
  avatar: string;
}

interface ChipInputProps {
  items: ChipItem[];
}

const ChipsComponent: React.FC<ChipInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);
  const [suggestedItems, setSuggestedItems] = useState<ChipItem[]>(items);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSuggestedItems(items.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedItems.includes(item.name)
    ));
    setActiveSuggestionIndex(0);
  }, [inputValue, items, selectedItems, isInputFocused]);

  const updateSuggestedItems = (value: string) => {
    const newSuggestedItems = isInputFocused && !value ?
      items.filter(item => !selectedItems.includes(item.name)) : 
      items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedItems.includes(item.name)
      );
    setSuggestedItems(newSuggestedItems);
    setActiveSuggestionIndex(0);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue) {
      updateSuggestedItems(newValue); 
    }
    setHighlightedChip(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '') {
      if (highlightedChip !== null) {
        const newSelectedItems = [...selectedItems];
        newSelectedItems.splice(highlightedChip, 1);
        setSelectedItems(newSelectedItems);
        setHighlightedChip(null);
        setInputValue('');
      } else if (selectedItems.length > 0) {
        setHighlightedChip(selectedItems.length - 1);
      }
    } else if (event.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestedItems.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
      event.preventDefault();
      const itemToAdd = suggestedItems[activeSuggestionIndex].name;
      setSelectedItems([...selectedItems, itemToAdd]);
      setSuggestedItems(suggestedItems.filter((item) => item.name !== itemToAdd));
      setInputValue('');
      setIsInputFocused(false); 
      setActiveSuggestionIndex(0);
    } else {
      setHighlightedChip(null);
    }
  };
  const handleItemSelect = (selectedItem: ChipItem) => {
    console.log("item clicked")
    setInputValue('');
    setSelectedItems([...selectedItems, selectedItem.name]); 
    setSuggestedItems(suggestedItems.filter((item) => item.name !== selectedItem.name));
    setIsInputFocused(false); 
  };

  const handleChipDelete = (itemToDelete: string) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToDelete));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 120); 
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chipContainer} onClick={() => inputRef.current?.focus()}>
      {selectedItems.map((name, index) => {
          const chipItem = items.find(item => item.name === name);
          return (
            <div
              key={index}
              className={`${styles.chip} ${
                highlightedChip === index ? styles.chipHighlighted : ''
              }`}
            >
              <span className={styles.avatar}>
                <img
                  src={chipItem?.avatar}
                  alt={name}
                  className={styles.avatarImg}
                />
              </span>
              {name}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleChipDelete(name);
                }}
                className={styles.chipButton}
              >
                &times;
              </button>
            </div>
          );
        })}
      <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={selectedItems.length === 0 ? 'Type to search...' : ''}
          className={styles.input}
        />
      </div>
      {(inputValue || isInputFocused) && suggestedItems.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestedItems.map((item, index) => (
            <li
              key={item.email}
              onClick={() => handleItemSelect(item)}
              className={
                `${styles.suggestionItem} ${index === activeSuggestionIndex ? styles.suggestionItemActive : ''}`
              }
            >
              {item.name}
              <span className={styles.emailText}> ({item.email})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipsComponent;