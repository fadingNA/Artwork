import MainNav from "@/components/navbar/MainNav";
import {render} from "@testing-library/react";
import '@testing-library/jest-dom'

describe('test-button', () => {
    test('renders the navbar brand', () => {
        render(<MainNav/>);
        const brandElement = screen.getByText(/Nonthachai Plodthong/i);
        expect(brandElement).toBeInTheDocument();
    });
    test('logs out the user', () => {
        const removeTokenSpy = jest.fn();
        const pushSpy = jest.fn();
        const {getByRole} = render(<MainNav router={{push: pushSpy}} removetoken={removeTokenSpy}/>);
        fireEvent.click(getByRole('button', {name: /#/i}));
        fireEvent.click(screen.getByText(/logout/i));
        expect(removeTokenSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith('/login');
    });
})