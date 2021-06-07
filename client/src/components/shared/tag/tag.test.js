import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Tag from './tag';

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

describe('Shared Tag Component', () => {
    it('throws an error if no tagName is given', () => {
        expect(() => {
            act(() => {
                render(<Tag />, container); 
            });
        }).toThrowError();
    });
    
    it('renders tagName as textContent', () => {
        act(() => {
            render(<Tag tagName="mock" />, container);
        });

        expect(container.textContent).toBe("mock");

        act(() => {
            render(<Tag tagName="test" />, container);
        });

        expect(container.textContent).toBe("test");
    });
});

