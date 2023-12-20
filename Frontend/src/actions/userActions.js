// actions/userActions.js
export const setUser = (user) => {
        console.log('Setting user:', user);
        return {
          type: 'SET_USER',
          payload: user,
        };
      };