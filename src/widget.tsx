import { ReactWidget } from '@jupyterlab/apputils';
import React, { useState } from 'react';


const getDogImage = async (setter: CallableFunction) => {
    const resp = await fetch("https://dog.ceo/api/breeds/image/random");
    if (resp.status === 200) {
        const data = await resp.json();
        setter(data.message);
    }
};
/**
 * React component for a counter.
 *
 * @returns The React component
 */
const DogViewerComponent = (): JSX.Element => {
  const [dogImg, setDogImg] = useState("");

  return (
    <div>
      <button
        onClick={(): void => {
          getDogImage(setDogImg);
        }}
      >
        Get A Dog Picture!
      </button>
      <div className="dog-image-container">
        <img src={dogImg} />
      </div>
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a DogViewerComponent.
 */
export class DogViewerWidget extends ReactWidget {
  /**
   * Constructs a new DogViewerWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <DogViewerComponent />;
  }
}