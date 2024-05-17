const handleNumberKeyDown = (e: React.KeyboardEvent) => {
  // Allow Tab key (key code 9) and Backspace key (key code 8)
  if (e.key === "Tab" || e.key === "Backspace") {
    return;
  }

  // Allow only numeric keys
  if (e.key < "0" || e.key > "9") {
    e.preventDefault();
  }
};

export { handleNumberKeyDown };
