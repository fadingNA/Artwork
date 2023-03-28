import Login from "@/pages/login";
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Login Components', () => {
    test('render login page', async () => {
        const user = userEvent.setup();
        const { container }= render(<Login/>);
        //Test button
        const button = container.querySelector('button');
        expect(button).toBeTruthy();
        expect(button).toBeDisabled();
        const form = container.querySelector('form');

    })
})