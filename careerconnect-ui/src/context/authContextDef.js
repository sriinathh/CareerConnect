import { createContext } from 'react';

/**
 * Authentication Context Definition.
 * Defined in a plain .js file so Fast Refresh only tracks component lifecycles in .jsx files.
 */
export const AuthContext = createContext(null);
