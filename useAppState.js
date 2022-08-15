import { useEffect, useState } from "react";
import { AppState } from "react-native";

export default function useAppState({ onForeground, onBackground, onChange, }) {
    const [appState, setAppState] = useState(AppState.currentState);
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === "active") onForeground?.();
            else if (appState === "active" && nextAppState.match(/inactive|background/))
                onBackground?.();
            setAppState(nextAppState);
            onChange?.(nextAppState);
        };
        const event = AppState.addEventListener("change", handleAppStateChange);
        return () => event.remove()
    }, [onBackground, onChange, onForeground, appState]);
    // Used for testing
    useEffect(() => {
        onChange?.();
    }, [appState, onChange]);
    return { appState, setAppState };
}