import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(
    key: string,
    initialValue: T,
    onChange?: (value: T) => void
): [T, Dispatch<SetStateAction<T>>, () => void] {
    // Helper to safely read the initial value from localStorage
    const readValue = (): T => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Update localStorage whenever the state changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
            onChange?.(storedValue);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue, onChange]);

    // Function to remove the key from localStorage
    const remove = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue); // Reset state to the initial value
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setStoredValue, remove];
}

export default useLocalStorage;
