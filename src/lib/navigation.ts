import type { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction = () => { };

export const setNavigate = (navigateFn: NavigateFunction) => navigate = navigateFn; 