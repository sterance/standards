import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [abv, setAbv] = useState('');
  const [size, setSize] = useState('');
  const [standards, setStandards] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalStandards, setTotalStandards] = useState('');
  const [pricePerStandard, setPricePerStandard] = useState('');

  const abvInputRef = useRef(null);
  const sizeInputRef = useRef(null);

  useEffect(() => {
    const numStandards = parseFloat(standards);
    const numQuantity = parseInt(quantity, 10);

    if (numStandards > 0 && numQuantity > 0) {
      const total = numStandards * numQuantity;
      setTotalStandards(total.toFixed(1));
    } else {
      setTotalStandards('');
    }
  }, [standards, quantity]);

  useEffect(() => {
    const numPrice = parseFloat(price);
    const numTotalStandards = parseFloat(totalStandards);

    if (numPrice > 0 && numTotalStandards > 0) {
      const perStandard = numPrice / numTotalStandards;
      setPricePerStandard(perStandard.toFixed(2));
    } else {
      setPricePerStandard('');
    }
  }, [price, totalStandards]);

  useEffect(() => {
    const activeElement = document.activeElement;

    if (abvInputRef.current && activeElement === abvInputRef.current) {
      const rawLength = abv.length;
      const currentPos = abvInputRef.current.selectionStart;

      if (currentPos > rawLength) {
        abvInputRef.current.setSelectionRange(rawLength, rawLength);
      }
    }
    else if (sizeInputRef.current && activeElement === sizeInputRef.current) {
      const rawLength = size.length;
      const currentPos = sizeInputRef.current.selectionStart;

      if (currentPos > rawLength) {
        sizeInputRef.current.setSelectionRange(rawLength, rawLength);
      }
    }
  }, [abv, size]);

  const calculateStandards = (currentAbv, currentSize) => {
    const numAbv = parseFloat(currentAbv);
    const numSize = parseFloat(currentSize);

    if (numAbv > 0 && numSize > 0) {
      const calculatedStandards = (numSize / 1000) * numAbv * 0.789;
      setStandards(calculatedStandards.toFixed(1));
    }
  };

  const handleAbvChange = (e) => {
    const rawValue = e.target.value.replace('%', '');
    setAbv(rawValue);
    calculateStandards(rawValue, size);
  };

  const handleSizeChange = (e) => {
    const rawValue = e.target.value.replace('ml', '');
    setSize(rawValue);
    calculateStandards(abv, rawValue);
  };

  const handleStandardsChange = (e) => {
    setStandards(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value.replace('$', ''));
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <h1>Standards</h1>
      <div className="inputs-container">
        <div className="inputs" id="standards-inputs">
          <label htmlFor="abv">ABV (%)</label>
          <input
            type="text"
            id="abv"
            name="abv"
            value={abv ? `${abv}%` : ''}
            onChange={handleAbvChange}
            ref={abvInputRef}
          />
          <label htmlFor="size">Size (ml)</label>
          <input
            type="text"
            id="size"
            name="size"
            value={size ? `${size}ml` : ''}
            onChange={handleSizeChange}
            ref={sizeInputRef}
          />
          <label htmlFor="standards">Standards per Drink</label>
          <input
            type="number"
            id="standards"
            name="standards"
            step="0.1"
            value={standards}
            onChange={handleStandardsChange}
          />
        </div>
        <div className="inputs" id="quantity-inputs">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            step="1"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <label htmlFor="total-standards">Total Standards</label>
          <input
            type="number"
            id="total-standards"
            name="total-standards"
            step="0.1"
            value={totalStandards}
            readOnly
          />
        </div>
        <div className="inputs" id="price-inputs">
          <label htmlFor="price">Total Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price ? `$${price}` : ''}
            onChange={handlePriceChange}
          />
          <label htmlFor="price-per-standard">Price per Standard</label>
          <input
            type="text"
            id="price-per-standard"
            name="price-per-standard"
            value={pricePerStandard ? `$${pricePerStandard}` : ''}
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default App;