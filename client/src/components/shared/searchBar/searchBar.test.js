import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SearchBar from './searchBar';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    console.error.mockClear();
});

afterAll(() => {
    console.error.mockRestore();
});

describe('Shared Search Bar Component', () => {
    it('throws an error if no handleSearch function is given', () => {
        expect(() => {
            act(() => {
                render(<SearchBar />, container); 
            });
        }).toThrowError();
    });
    
    it('calls handleSearch when submitted with correct input', () => {
        const handleSearch = jest.fn();

        act(() => {
            render(<SearchBar handleSearch={handleSearch} />, container);
        });

        const submitBtn = document.querySelector("[data-testid=submitBtn]");
        const inputField = document.querySelector("[data-testid=searchInput]");

        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(inputField, 'mock');

        var ev2 = new Event('input', { bubbles: true});
        inputField.dispatchEvent(ev2);

        submitBtn.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        

        expect(handleSearch).toHaveBeenCalledTimes(1);
        expect(handleSearch.mock.calls[0][1]).toBe('mock');
    });
});

