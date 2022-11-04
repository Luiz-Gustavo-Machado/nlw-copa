import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContexDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContexDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '867844094491-tl43mumpmn2ora1nfhjd5dp0a90eg37t.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  console.log(AuthSession.makeRedirectUri({ useProxy: true }));

  async function singIn() {
    try {
      setIsUserLoading(true)
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  },[response])

  return (
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}